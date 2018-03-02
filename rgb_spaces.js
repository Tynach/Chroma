/******************************************************************************
 * This file defines several common colorspace standards. Make sure that you  *
 * first load the 'colorspace.js' file, as this file depends on its contents. *
 ******************************************************************************/

/*
 * Chromaticities for RGB primaries
 */

// CIE 1931 RGB
const primariesCie = primaries(
	0.72329, 0.27671,
	0.28557, 0.71045,
	0.15235, 0.02
);

// Identity RGB
const primariesIdentity = primaries(
	1, 0,
	0, 1,
	0, 0
);

// Original 1953 NTSC primaries
const primariesNtsc = primaries(
	0.67, 0.33,
	0.21, 0.71,
	0.14, 0.08
);

// European Broadcasting Union primaries for SDTV and Rec. 601 (625 lines)
const primariesEbu = primaries(
	0.64, 0.33,
	0.29, 0.6,
	0.15, 0.06
);

// P22 Phosphor primaries (allegedly; only found one source)
// Used by older versions of SMPTE-C, before specific chromaticities were given
const primariesP22 = primaries(
	0.61, 0.342,
	0.298, 0.588,
	0.151, 0.064
);

// Modern day SMPTE-C primaries, used in modern NTSC (Rec. 601) and SMPTE-240M
const primariesSmpteC = primaries(
	0.63, 0.34,
	0.31, 0.595,
	0.155, 0.07
);

// Never-popular, antiquated, and idealized 'HDTV' primaries based mostly on the
// 1953 NTSC colorspace. SMPTE-240M officially used the SMPTE-C primaries
const primaries240m = primaries(
	0.67, 0.33,
	0.21, 0.71,
	0.15, 0.06
);

// Alleged primaries for old Sony TVs with a very blue whitepoint
const primariesSony = primaries(
	0.625, 0.34,
	0.28, 0.595,
	0.155, 0.07
);

// Rec. 709 (HDTV) and sRGB primaries
const primaries709 = primaries(
	0.64, 0.33,
	0.3, 0.6,
	0.15, 0.06
);

// DCI-P3 primaries
const primariesDciP3 = primaries(
	0.68, 0.32,
	0.265, 0.69,
	0.15, 0.06
);

// Rec. 2020 UHDTV primaries
const primaries2020 = primaries(
	0.708, 0.292,
	0.17, 0.797,
	0.131, 0.046
);

// If the HUNT XYZ->LMS matrix were expressed instead as
// chromaticity coordinates, these would be them
const primariesHunt = primaries(
	0.8374, 0.1626,
	2.3, -1.3,
	0.168, 0
);

// If the CIECAM97_1 XYZ->LMS matrix were expressed instead as
// chromaticity coordinates, these would be them
const primariesCiecam971 = primaries(
	0.7, 0.306,
	-0.357, 1.26,
	0.136, 0.042
);

// If the CIECAM97_2 XYZ->LMS matrix were expressed instead as
// chromaticity coordinates, these would be them
const primariesCiecam972 = primaries(
	0.693, 0.316,
	-0.56, 1.472,
	0.15, 0.067
);

// If the CIECAM02 XYZ->LMS matrix were expressed instead as
// chromaticity coordinates, these would be them
const primariesCiecam02 = primaries(
	0.711, 0.295,
	-1.476, 2.506,
	0.144, 0.057
);

// LMS primaries as chromaticity coordinates, computed from
// http://www.cvrl.org/ciepr8dp.htm, and
// http://www.cvrl.org/database/text/cienewxyz/cie2012xyz2.htm
/*const primariesLms = primaries(
	0.73840145, 0.26159855,
	1.32671635, -0.32671635,
	0.15861916, 0
);*/

// Same as above, but in fractional form
const primariesLms = primaries(
	194735469/263725741, 68990272/263725741,
	141445123/106612934, -34832189/106612934,
	36476327/229961670, 0
);


/*
 * Chromaticities for white points
 */

// Standard Illuminant C. White point for the original 1953 NTSC color system
const whiteC = chromaCoords(0.310063, 0.316158);

// Standard illuminant E (also known as the 'equal energy' white point)
const whiteE = chromaCoords(1/3, 1/3);

// Alleged whitepoint to use with the P22 phosphors (D65 might be more proper)
const whiteP22 = chromaCoords(0.313, 0.329);

// Standard illuminant D65. Note that there are more digits here than specified
// in either sRGB or Rec 709, so in some cases results may differ from other
// software. Color temperature is roughly 6504 K (originally 6500K, but complex
// science stuff made them realize that was innaccurate)
const whiteD65 = chromaCoords(0.312713, 0.329016);

// Standard illuminant D50. Just included for the sake of including it. Content
// for Rec. 709 and sRGB is recommended to be produced using a D50 whitepoint.
// For the same reason as D65, the color temperature is 5003 K instead of 5000 K
const whiteD50 = chromaCoords(0.34567, 0.35850);

// White point for DCI-P3 Theater
const whiteTheater = chromaCoords(0.314, 0.351);

// Very blue white point for old Sony televisions. Color temperature of 9300 K.
// Use with the 'primariesSony' RGB primaries defined above
const whiteSony = chromaCoords(0.283, 0.298);


/*
 * Gamma curve parameters
 */

// Linear gamma
const gam10 = new transfer(1.0, 0.0, 1.0, 0.0, 0.0);

// Gamma of 1.8; used by older Macintosh systems
const gam18 = new transfer(1.8, 0.0, 1.0, 0.0, 0.0);

// Gamma of 2.2; not linear near 0. Was defined abstractly to be used by early
// NTSC systems, and is what Adobe RGB uses
const gam22 = new transfer(2.2, 0.0, 1.0, 0.0, 0.0);

// Gamma of 2.4; not linear near 0. Seems a popular choice among some people
// online, so I included it. I don't think any standard uses this
const gam24 = new transfer(2.4, 0.0, 1.0, 0.0, 0.0);

// Gamma of 2.5; not linear near 0. Approximately what old Sony TVs used
const gam25 = new transfer(2.5, 0.0, 1.0, 0.0, 0.0);

// Gamma of 2.8; not linear near 0. Loosely defined gamma for European SDTV
const gam28 = new transfer(2.8, 0.0, 1.0, 0.0, 0.0);

// Modern SMPTE 170M, as well as Rec. 601, Rec. 709, and a rough approximation
// for Rec. 2020 content as well. Do not use with Rec. 2020 if you work with
// high bit depths!
const gam170m = new transfer(1.0/0.45, 0.099, 4.5, 0.0812, 0.018);

// Gamma for sRGB. Besides being full-range (0-255 values), this is the only
// difference between sRGB and Rec. 709.
const gamSrgb = new transfer(2.4, 0.055, 12.92, 0.04045, 0.0031308);


/*
 * RGB Colorspaces
 */

// CIE 1931 RGB
const Cie1931 = new rgb_space(primariesCie, whiteE, gam10);

// Identity RGB
const Identity = new rgb_space(primariesIdentity, whiteE, gam10);

// Original 1953 NTSC
const Ntsc = new rgb_space(primariesNtsc, whiteC, gam22);

// Mostly unused and early HDTV standard (SMPTE 240M)
const Smpte240m = new rgb_space(primaries240m, whiteD65, gam22);

// European Broadcasting Union (EBU) Tech. 3213-E
const Ebu = new rgb_space(primariesEbu, whiteD65, gam28);

// Original, imprecise colorspace for NTSC after 1987 (probably incorrect)
const SmpteC = new rgb_space(primariesP22, whiteD65, gam22);

// Modern SMPTE "C" colorimetry
const Smpte170m = new rgb_space(primariesSmpteC, whiteD65, gam170m);

// Old Sony displays using high temperature white point
const Sony = new rgb_space(primariesSony, whiteSony, gam25);

// Rec. 709 (HDTV)
const Rec709 = new rgb_space(primaries709, whiteD65, gam170m);

// sRGB (mostly the same as Rec. 709, but different gamma and full range values)
const Srgb = new rgb_space(primaries709, whiteD65, gamSrgb);

// DCI-P3 D65
const DciP3D65 = new rgb_space(primariesDciP3, whiteD65, gam170m);

// DCI-P3 Theater
const DciP3Theater = new rgb_space(primariesDciP3, whiteTheater, gam170m);

// Rec. 2020
const Rec2020 = new rgb_space(primaries2020, whiteD65, gam170m);

// Hunt primaries, balanced against equal energy white point
const HuntRgb = new rgb_space(primariesHunt, whiteE, gam10);

// CIE CAM 1997 primaries, balanced against equal energy white point
const Ciecam971Rgb = new rgb_space(primariesCiecam971, whiteE, gam10);

// CIE CAM 1997 primaries, balanced against equal energy white point and linearized
const Ciecam972Rgb = new rgb_space(primariesCiecam972, whiteE, gam10);

// CIE CAM 2002 primaries, balanced against equal energy white point
const Ciecam02Rgb = new rgb_space(primariesCiecam02, whiteE, gam10);

// Lms primaries, balanced against equal energy white point
const LmsRgb = new rgb_space(primariesLms, whiteE, gam10);


/*
 * List of defined colorspaces
 */

const rgb_spaces = {
	"CIE 1931 RGB": Cie1931,
	"CIE 1931 XYZ Identity": Identity,
	"1953 NTSC": Ntsc,
	"SMPTE 240M Idealized": Smpte240m,
	"EBU Tech. 3213-E": Ebu,
	"SMPTE P22 (1987 NTSC)": SmpteC,
	"SMPTE 170m (1994 NTSC)": Smpte170m,
	"Old Sony Monitors": Sony,
	"Rec. 709": Rec709,
	"sRGB": Srgb,
	"DCI-P3 D65": DciP3D65,
	"DCI-P3 Theater": DciP3Theater,
	"Rec. 2020": Rec2020
};