"use strict";

import {OctaviaDevice} from "../state/index.mjs";
import {RootDisplay, ccToPos} from "../basic/index.mjs";
import {MxFont40, MxBm256, MxBmDef} from "../basic/mxReader.js";

import {
	bgWhite,
	inactivePixel,
	activePixel
} from "./colour.js";

let QyDisplay = class extends RootDisplay {
	#omdb = new Uint8Array(8192); // Full display
	#nmdb = new Uint8Array(8192); // Full display, but on commit
	#mode = "?";
	#ch = 0;
	#refreshed = true;
	#backlight = bgWhite;
	#bmst = 0;
	#bmex = 0;
	#bmdb = new Uint8Array(256);
	songTitle = "";
	xgFont = new MxFont40("./data/bitmaps/xg/font.tsv");
	sqrFont = new MxFont40("./data/bitmaps/xg/qySqr.tsv");
	qy35Font = new MxFont40("./data/bitmaps/xg/qyCh35.tsv");
	qy55Font = new MxFont40("./data/bitmaps/xg/qyCh55.tsv");
	qyRsrc = new MxBmDef("./data/bitmaps/xg/qyRsrc.tsv");
	sysBm = new MxBm256("./data/bitmaps/xg/system.tsv");
	voxBm = new MxBm256("./data/bitmaps/xg/voices.tsv");
	constructor() {
		super(new OctaviaDevice(), 0, 0.95);
		let upThis = this;
		this.addEventListener("mode", function (ev) {
			(upThis.sysBm.getBm(`st_${({"gm":"gm1","g2":"gm2","?":"gm1","ns5r":"korg","ag10":"korg","x5d":"korg","05rw":"korg","krs":"korg","sg":"gm1","k11":"gm1"})[ev.data] || ev.data}`) || []).forEach(function (e, i) {
				upThis.#bmdb[i] = e;
			});
			upThis.#bmst = 2;
			upThis.#bmex = Date.now() + 1600;
		});
	};
	setCh(ch) {
		this.#ch = ch;
	};
	getCh() {
		return this.#ch;
	};
	#renderBox(sx, sy, width, height) {
		let length = width * height;
		let offset = sx + sy * 128;
		for (let i = 0; i < length; i ++) {
			let x = i % width, y = Math.floor(i / width);
			if (
				x == 0 && y < height - 1 ||
				y == 0 && x < width - 1 ||
				x == width - 1 && y > 0 ||
				y == height - 1 && x > 0 ||
				x == width - 2
			) {
				this.#nmdb[offset + x + y * 128] = 1;
			};
		};
	};
	#renderFill(sx, sy, width, height, target = 1) {
		let length = width * height;
		let offset = sx + sy * 128;
		for (let i = 0; i < length; i ++) {
			let x = i % width, y = Math.floor(i / width);
			this.#nmdb[offset + x + y * 128] = target;
		};
	};
	#renderMosaic(sx, sy, width, height, start = 1) {
		let curBit = !start;
		let offset = sx + sy * 128,
		length = width * height;
		for (let i = 0; i < length; i ++) {
			let x = i % width, y = Math.floor(i / width);
			if (x == 0 && y > 0 && width % 2 == 0) {} else {
				curBit = !curBit;
			};
			this.#nmdb[offset + x + y * 128] = +curBit;
		};
	};
	#getCat(channel, msb, prg) {
		let voiceInfo = this.getChVoice(channel);
		let category;
		if (["GM", "AG", "XG", "GS", "G2"].indexOf(voiceInfo.standard) > -1) {
			switch(msb) {
				case 64: {
					category = "sfx";
					break;
				};
				case 120:
				case 122:
				case 126:
				case 127: {
					category = "dr";
					break;
				};
				default: {
					category = (prg >> 3).toString(16);
				};
			};
		} else {
			category = voiceInfo.standard;
			category = `${category[0]}${category[1].toLowerCase()}`;
		};
		return category;
	};
	render(time, ctx, mixerView, id = 0) {
		let sum = super.render(time);
		let upThis = this;
		let timeNow = Date.now();
		// Channel test
		let alreadyMin = false;
		let minCh = 0, maxCh = 0;
		sum.chInUse.forEach(function (e, i) {
			if (e) {
				if (!alreadyMin) {
					alreadyMin = true;
					minCh = i;
				};
				maxCh = i;
			};
		});
		let part = minCh >> 4;
		minCh = part << 4;
		maxCh = ((maxCh >> 4) << 4) + 15;
		if (this.#ch > maxCh) {
			this.#ch = minCh + this.#ch & 15;
		};
		if (this.#ch < minCh) {
			this.#ch = maxCh - 15 + (this.#ch & 15);
		};
		let chOff = this.#ch * ccToPos.length;
		// Clear out the current working display buffer.
		this.#nmdb.forEach((e, i, a) => {a[i] = 0});
		// Start rendering
		if (mixerView) {
			// Mixer view
			// Render the upperleft
			upThis.qyRsrc.getBm("MixPill")?.render((e, x, y) => {
				if (e) {
					upThis.#nmdb[x + y * 128] = 1;
				};
			});
			upThis.qyRsrc.getBm("MixIcon")?.render((e, x, y) => {
				if (e) {
					upThis.#nmdb[10 + x + y * 128] = 1;
				};
			});
			// Info labels
			upThis.qyRsrc.getBm("MsVoice")?.render((e, x, y) => {
				upThis.#nmdb[2176 + x + y * 128] = e;
			});
			upThis.qyRsrc.getBm("ElPan")?.render((e, x, y) => {
				upThis.#nmdb[4096 + x + y * 128] = e;
			});
			upThis.qyRsrc.getBm("ElVol")?.render((e, x, y) => {
				upThis.#nmdb[4864 + x + y * 128] = e;
			});
			upThis.qyRsrc.getBm("ElMsPa")?.render((e, x, y) => {
				upThis.#nmdb[5634 + x + y * 128] = e;
			});
			// Global mosaic
			upThis.#renderMosaic(0, 50, 5, 14, 1);
			upThis.#renderFill(5, 50, 1, 14);
			upThis.#renderMosaic(7, 50, 10, 14, 0);
			upThis.#renderFill(10, 52, 1, 10);
			upThis.#renderFill(11, 52, 1, 10, 0);
			upThis.#renderFill(17, 50, 1, 14);
			upThis.#renderMosaic(19, 50, 10, 14, 0);
			upThis.#renderFill(22, 52, 1, 10);
			upThis.#renderFill(23, 52, 1, 10, 0);
			let masterVol = 9 - Math.floor(sum.master.volume / 10.1);
			upThis.qyRsrc.getBm("VolSlid")?.render((e, x, y) => {
				upThis.#nmdb[7 + x + (50 + masterVol + y) * 128] = e;
			});
			upThis.#renderFill(8, 53 + masterVol, 8, 1);
			upThis.qyRsrc.getBm("VolSlid")?.render((e, x, y) => {
				upThis.#nmdb[6419 + x + y * 128] = e;
			});
			upThis.#renderFill(20, 53, 8, 1);
			upThis.#renderFill(29, 24, 1, 40);
			// Bank info
			let voiceInfo = upThis.getChVoice(this.#ch);
			upThis.xgFont.getStr(`${(sum.chProgr[this.#ch] + 1).toString().padStart(3, "0")}${"+ "[+((["GM", "MT", "AG"].indexOf(voiceInfo.standard) > -1) || sum.chContr[chOff] >= 120)]}${voiceInfo.name.slice(0, 8)}`).forEach((e, i) => {
				e.render((e, x, y) => {
						upThis.#nmdb[55 + x + i * 6 + y * 128] = e;
				});
			});
			let curCat = upThis.#getCat(this.#ch, sum.chContr[this.#ch * ccToPos.length], sum.chProgr[this.#ch]),
			curCatBm = upThis.qyRsrc.getBm(`Vox_${curCat}`);
			if (curCatBm) {
				curCatBm.render((e, x, y) => {
					upThis.#nmdb[37 + x + y * 128] = e;
				});
			} else {
				upThis.xgFont.getStr(curCat).forEach((e, i) => {
					e.render((e, x, y) => {
						upThis.#nmdb[37 + x + i * 6 + y * 128] = e;
					});
				});
			};
		} else {
			// Normal view
			// Render the pill
			upThis.qyRsrc.getBm("NorPill")?.render((e, x, y) => {
				if (e) {
					upThis.#nmdb[x + y * 128] = 1;
				};
			});
			// Carve out the text on that pill
			upThis.xgFont.getStr("SONG").forEach((e, i) => {
				e.render((e, x, y) => {
					if (e) {
						upThis.#nmdb[5 + x + i * 6 + y * 128] = 0;
					};
				});
			});
			// Prepare info boxes
			// Song info box
			upThis.#renderBox(34, 6, 65, 11);
			upThis.#renderFill(35, 7, 13, 9);
			upThis.#renderBox(100, 6, 28, 11); // Bar box
			if (sum.letter.expire < timeNow) {
				upThis.xgFont.getStr(`${id + 1}`.padStart(2, "0")).forEach((e, i) => {
					e.render((e, x, y) => {
						if (e) {
							upThis.#nmdb[1060 + x + i * 6 + y * 128] = 0;
						};
					});
				});
				if (upThis.songTitle.length < 9) {
					upThis.xgFont.getStr(upThis.songTitle || "Unknown").forEach((e, i) => {
						e.render((e, x, y) => {
							upThis.#nmdb[1073 + x + i * 6 + y * 128] = e;
						});
					});
				} else {
					let sngTtl = upThis.songTitle;
					while (sngTtl.indexOf("  ") > -1) {
						sngTtl = sngTtl.replaceAll("  ", " ");
					};
					let rollX = Math.floor(time * 25) % (6 * (10 + sngTtl.length)) - 47;
					upThis.xgFont.getStr(`${sngTtl}  ${sngTtl.slice(0, 8)}`).forEach((e, i) => {
						e.render((e, x, y) => {
							let area = x + i * 6;
							let tX = rollX;
							if (rollX < 0) {
								tX = rollX >= -48 ? 0 : rollX + 48;
							};
							if (area >= tX && area < tX + 47) {
								upThis.#nmdb[1073 - tX + area + y * 128] = e;
							};
						});
					});
				};
				// Bar info box
				{
					let blinker = sum.noteBeat % 1;
					upThis.sqrFont.getStr(`${"$%"[+(blinker > 0 && blinker <= 0.25)]}${(sum.noteBar + 1).toString().padStart(3, "0")}`).forEach((e, i) => {
						e.render((e, x, y) => {
							upThis.#nmdb[1126 + x + i * 6 + y * 128] = e;
						});
					});
				};
			};
			// Tempo render
			upThis.sqrFont.getStr(`&=${Math.round(sum.tempo).toString().padStart(3, "0")}`).forEach((e, i) => {
				e.render((e, x, y) => {
					upThis.#nmdb[2048 + x + i * 6 + y * 128] = e;
				});
			});
			// tSig render
			upThis.xgFont.getStr(`${sum.tSig[0].toString().padStart(2, " ")}/${sum.tSig[1].toString().padEnd(2, " ")}`).forEach((e, i) => {
				e.render((e, x, y) => {
					upThis.#nmdb[3072 + x + i * 6 + y * 128] = e;
				});
			});
			// Placeholder
			upThis.qyRsrc.getBm("Vtfj")?.render((e, x, y) => {
				upThis.#nmdb[2338 + x + y * 128] = e;
			});
			// Transpose render
			{
				let tPit = upThis.device.getPitchShift(upThis.#ch);
				let tStr = tPit < 0 ? "-" : "+";
				tStr += `${Math.round(Math.abs(tPit))}`.padStart(2, "0");
				upThis.xgFont.getStr(tStr).forEach((e, i) => {
					e.render((e, x, y) => {
						upThis.#nmdb[3127 + x + i * 6 + y * 128] = e;
					});
				});
			};
			// Jump render
			upThis.xgFont.getStr("001").forEach((e, i) => {
				e.render((e, x, y) => {
					upThis.#nmdb[3181 + x + i * 6 + y * 128] = e;
				});
			});
			// Split line
			upThis.#renderFill(71, 48, 1, 16);
			upThis.qyRsrc.getBm("Mod_Usr")?.render((e, x, y) => {
				upThis.#nmdb[6253 + x + y * 128] = e;
			});
			// Bank info
			{
				let voiceName = upThis.getChVoice(this.#ch);
				upThis.xgFont.getStr(`${sum.chContr[chOff + ccToPos[0]].toString().padStart(3, "0")} ${sum.chProgr[this.#ch].toString().padStart(3, "0")} ${sum.chContr[chOff + ccToPos[32]].toString().padStart(3, "0")}`).forEach((e, i) => {
					e.render((e, x, y) => {
						upThis.#nmdb[6145 + 6 * i + x + y * 128] = e;
					});
				});;
				upThis.xgFont.getStr(`${voiceName.standard}:${voiceName.name.slice(0, 8)}`).forEach((e, i) => {
					e.render((e, x, y) => {
						upThis.#nmdb[7169 + 6 * i + x + y * 128] = e;
					});
				});
			};
			// Fetch voice bitmap
			// Commit to bitmap screen
			let useBm;
			if (timeNow <= sum.bitmap.expire) {
				// Use provided bitmap
				useBm = sum.bitmap.bitmap;
			} else {
				// Use stored pic
				useBm = this.#bmdb.slice();
				if (timeNow >= this.#bmex) {
					this.#bmst = 0;
					let standard = upThis.getChVoice(this.#ch).standard.toLowerCase();
					useBm = this.voxBm.getBm(upThis.getChVoice(this.#ch).name) || this.voxBm.getBm(upThis.getVoice(sum.chContr[chOff] + ccToPos[0], sum.chProgr[this.#ch], 0, sum.mode).name);
					if (["an", "ap", "dr", "dx", "pc", "pf", "sg", "vl"].indexOf(standard) > -1) {
						useBm = this.sysBm.getBm(`ext_${standard}`);
					};
					if (!useBm && (sum.chContr[chOff + ccToPos[0]] < 48 || sum.chContr[chOff + ccToPos[0]] == 56)) {
						useBm = this.voxBm.getBm(upThis.getVoice(0, sum.chProgr[this.#ch], 0, sum.mode).name)
					};
					if (!useBm && (sum.chContr[chOff] + ccToPos[0]) == 126) {
						useBm = this.sysBm.getBm("cat_smpl");
					};
					if (!useBm && (sum.chContr[chOff] + ccToPos[0]) == 64) {
						useBm = this.sysBm.getBm("cat_sfx");
					};
					if (!useBm) {
						useBm = this.sysBm.getBm("no_abm");
					};
				} else {
					if (this.#bmst == 2) {
						useBm.forEach((e, i, a) => {
							let crit = Math.floor((this.#bmex - timeNow) / 400);
							a[i] = crit % 2 == e;
						});
					};
				};
			};
			if (useBm) {
				useBm.width = useBm.length / 16;
			};
			useBm?.render((e, x, y) => {
				if (useBm.width < 32) {
					upThis.#nmdb[6217 + 2 * x + y * 128] = e;
					upThis.#nmdb[6218 + 2 * x + y * 128] = e;
				} else {
					upThis.#nmdb[6217 + x + y * 128] = e;
				};
			});
		};
		{
			// Channel tabs
			let curSeg = this.#ch >> 3;
			let preCal = mixerView ? 1310 : 4254,
			preCalY = mixerView ? 10 : 33;
			// Channel info box
			if (mixerView) {
				upThis.#renderFill(28, preCalY - 1, 99, 15);
				upThis.#renderFill(29, preCalY, 97, 13, 0);
			} else {
				upThis.#renderBox(0, preCalY - 1, 128, 15);
			};
			// Arrows
			if (curSeg < (maxCh >> 3)) {
				upThis.qyRsrc.getBm(`ArrowR${+mixerView + 1}`)?.render((e, x, y) => {
					upThis.#nmdb[preCal + 735 + x + y * 128] = e;
				});
			};
			if (curSeg > (minCh >> 3)) {
				upThis.qyRsrc.getBm(`ArrowL${+mixerView + 1}`)?.render((e, x, y) => {
					upThis.#nmdb[preCal + 610 + (+mixerView * 27) + x + y * 128] = e;
				});
			};
			if (!mixerView) {
				// PtCdTm
				upThis.qyRsrc.getBm("PtCdTm")?.render((e, x, y) => {
					upThis.#nmdb[4227 + x + y * 128] = e;
				});
				// The tempo pill
				if (sum.tempo != 120) {
					upThis.qyRsrc.getBm("ActPill")?.render((e, x, y) => {
						upThis.#nmdb[5141 + x + y * 128] = e;
					});
				};
			};
			for (let tch = 0; tch < 8; tch ++) { // target channel
				let rch = curSeg * 8 + tch,
				textTarget = 1;
				upThis.qyRsrc.getBm("CTabOff")?.render((e, x, y) => {
					upThis.#nmdb[preCal + 12 * tch + x + y * 128] = e;
				});
				let cVelo = Math.floor(sum.strength[rch] / 51);
				upThis.#renderFill(31 + 12 * tch, preCalY + 11 - cVelo, 9, cVelo + 1);
				if (this.#ch == rch) {
					textTarget = 0;
					upThis.#renderFill(31 + 12 * tch, preCalY, 9, 5);
					if (mixerView) {
						upThis.#renderFill(30 + 12 * tch, preCalY + 14, 13, 8);
					};
				};
				if (rch < 19) {
					upThis.qy55Font.getStr(String.fromCharCode(48 + rch))[0].render((e, x, y) => {
						if (e) {
							upThis.#nmdb[preCal + 3 + 12 * tch + x + y * 128] = textTarget;
						};
					});
				} else {
					upThis.qy35Font.getStr((rch + 1).toString()).forEach((e, i) => {
						e.render((e, x, y) => {
							if (e) {
								upThis.#nmdb[preCal + 2 + 4 * i + 12 * tch + x + y * 128] = textTarget;
							};
						});
					});
				};
				if (mixerView) {
					upThis.#renderMosaic(31 + tch * 12, 32, 10, 32, 0);
					upThis.#renderFill(41 + tch * 12, 32, 1, 32);
					upThis.#renderFill(34 + tch * 12, 43, 1, 18);
					upThis.#renderFill(35 + tch * 12, 45, 1, 16, 0);
					upThis.#renderFill(31 + tch * 12, 63, 10, 1);
					upThis.qyRsrc.getBm("PanIcon")?.render((e, x, y) => {
						upThis.#nmdb[4255 + tch * 12 + x + y * 128] = e;
					});
					let volSlid = 15 - (sum.chContr[rch * ccToPos.length + ccToPos[7]] >> 3);
					upThis.qyRsrc.getBm("VolSlid")?.render((e, x, y) => {
						upThis.#nmdb[5535 + tch * 12 + x + (volSlid + y) * 128] = e;
					});
					upThis.#renderFill(32 + tch * 12, 46 + volSlid, 8, 1);
					// Category render
					let curCat = upThis.#getCat(rch, sum.chContr[rch * ccToPos.length], sum.chProgr[rch]),
					curCatBm = upThis.qyRsrc.getBm(`Vox_${curCat}`);
					if (curCatBm) {
						curCatBm.render((e, x, y) => {
							if (e) {
								upThis.#nmdb[3103 + tch * 12 + x + y * 128] = textTarget;
							};
						});
					} else {
						upThis.xgFont.getStr(curCat).forEach((e, i) => {
							e.render((e, x, y) => {
								if (e) {
									upThis.#nmdb[3103 + tch * 12 + x + i * 6 + y * 128] = textTarget;
								};
							});
						});
					};
				};
			};
		};
		if (timeNow <= sum.letter.expire) {
			//upThis.#renderFill(12, 9, 109, 31);
			upThis.qyRsrc.getBm("TxtDisp")?.render((e, x, y) => {
				upThis.#nmdb[(mixerView ? 655 : 1036) + x + y * 128] = e;
			});
			upThis.xgFont.getStr(sum.letter.text).forEach((e, i) => {
				let ri = (i % 16) * 6, ry = i >> 4;
				e.render((e, x, y) => {
					upThis.#nmdb[(mixerView ? 1686 : 2067) + ri + x + (y + ry * 8) * 128] = e;
				});
			});
		};
		// Screen buffer write finish.
		// Determine if full render is required.
		let drawPixMode = false;
		if (this.#refreshed) {
			// Full render required.
			// Clear all pixels.
			ctx.fillStyle = this.#backlight.replace("64", "");
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			drawPixMode = true;
			this.#refreshed = false;
		};
		// Commit to display accordingly.
		this.#nmdb.forEach((e, i) => {
			let pixX = i % 128, pixY = Math.floor(i / 128);
			let hasDifference = this.#omdb[i] != e;
			if (!drawPixMode && hasDifference) {
				ctx.fillStyle = this.#backlight.slice(0, 7);
				ctx.fillRect(6 * pixX + 7, 7 + 8 * pixY, 6, 8);
			};
			if (drawPixMode || hasDifference) {
				ctx.fillStyle = ["#0000001a", "#0000009f"][e];
				if (drawPixMode) {
					ctx.fillStyle = ctx.fillStyle.slice(0, 7);
				};
				ctx.fillRect(6 * pixX + 7, 7 + 8 * pixY, 5.5, 7.5);
			};
		});
		// Commit to old display buffer.
		this.#nmdb.forEach((e, i) => {
			if (this.#omdb[i] != e) {
				this.#omdb[i] = e;
			};
		});
	};
};

export default QyDisplay;
