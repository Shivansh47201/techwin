
import { aseLightSource1p5um } from "./ase-sources/1-5um-ase";
import { aseLightSource1um } from "./ase-sources/1um-ase";
import { aseLightSource2um } from "./ase-sources/2um-ase";
import { broadbandLightSource } from "./ase-sources/broadband";
import { sledLightSource } from "./ase-sources/sled-ase";
import { highPowerFiberAmplifier } from "./fiber-amplifiers/high-power";
import { fiberAmplifierModules } from "./fiber-amplifiers/modules";
import { polarizationMaintainingFiberAmplifier } from "./fiber-amplifiers/pm";
import { highPowerSingleFrequency1_5um_0_2W } from "./high-power/1-5um-0-2w";
import { highPowerSingleFrequency1_5um_2_20W } from "./high-power/1-5um-2-20w";
import { highPowerSingleFrequency1_5um_20_120W } from "./high-power/1-5um-20-120w";
import { highPowerCWSingleFrequencyFiberLaser1_5um } from "./high-power/1-5um-cw";
import { highPowerSingleFrequency1um_0_2W } from "./high-power/1um-0-2w";
import { highPowerSingleFrequency1um_2_20W } from "./high-power/1um-2-20w";
import { highPowerSingleFrequency1um_20_500W } from "./high-power/1um-20-500w";
import { highPowerCWSingleFrequencyFiberLaser1um } from "./high-power/1um-cw";
import { highPowerSingleFrequency2um_0_05_2W } from "./high-power/2um-0-05-2w";
import { highPowerSingleFrequency2um_2_20W } from "./high-power/2um-2-20w";
import { highPowerSingleFrequency2um_20_500W } from "./high-power/2um-20-500w";
import { highPowerCWSingleFrequencyFiberLaser2um } from "./high-power/2um-cw";
import { kilowattLevelFiberLaserCombustionDiagnostics } from "./high-power/kilowatt";
import { longDistanceHighResolutionLidarFiberLaser } from "./high-power/lidar";
import { onePointFiveMicronNarrowLinewidthSeedLaser } from "./seed-lasers/1-5um-narrow";
import { onePointFiveMicronPhaseModulatedSeedLaser } from "./seed-lasers/1-5um-phase";
import { oneMicronHighReliabilitySingleFrequencySeedSource } from "./seed-lasers/1um-high-reliability";
import { oneMicronIndustrialSingleFrequencySeedSource } from "./seed-lasers/1um-industrial";
import { oneMicronNarrowLinewidthSeedLaser } from "./seed-lasers/1um-narrow";
import { oneMicronFrequencyStabilizedSeedLaser } from "./seed-lasers/1um-stabilized";
import { ultraLowNoiseSeedLaser } from "./seed-lasers/1um-ultra-low-noise";
import { twoMicronPhaseModulatedFiberSeedSource } from "./seed-lasers/2um-phase";
import { twoMicronSingleFrequencySeedLaser } from "./seed-lasers/2um-single";
import { onePointFiveMicronSingleFrequencyFiberLaser } from "./single-frequency/1-5um";
import { onePointFiveMicronHighReliabilitySingleFrequencyFiberLaser } from "./single-frequency/1-5um-high-reliability";
import { onePointFiveMicronIndustrialSingleFrequencyFiberLaser } from "./single-frequency/1-5um-industrial";
import { oneMicronSingleFrequencyFiberLaser } from "./single-frequency/1um";
import { twoMicronSingleFrequencyFiberLaser } from "./single-frequency/2um";
import { twoMicronHighReliabilitySingleFrequencyFiberLaser } from "./single-frequency/2um-high-reliability";
import { twoMicronIndustrialSingleFrequencyFiberLaser } from "./single-frequency/2um-industrial";
import { broadbandUltraLowNoise } from "./single-frequency/broadband-low-noise";
import { compactSingleFrequencyFiberLaser } from "./single-frequency/compact";
import { magneticFieldDetectionLaser } from "./single-frequency/magnetic-field";
import { narrowLinewidth } from "./single-frequency/narrow-linewidth";
import { highSensitivitySensorStabilizedFiberLaser } from "./single-frequency/sensor-stabilized";
import { frequencyStabilizedFiberLaser } from "./single-frequency/stabilized";
import { ultraLowNoiseFiberLaserSeries } from "./single-frequency/ultra-low-noise";
import { ultraNarrowLinewidth } from "./single-frequency/ultra-narrow-linewidth";
import { pointLightSource1p5um } from "./sled/1-5um-point";
import { pointLightSource1um } from "./sled/1um-point";
import { pointLightSource2um } from "./sled/2um-point";
import { noiseTesting } from "./testing/noise";
import { spectralTesting } from "./testing/spectral";
import { nm193WavelengthConversionLaser } from "./wavelength-conversion/193nm";
import { nm266WavelengthConversionLaser } from "./wavelength-conversion/266nm";
import { nm355WavelengthConversionLaser } from "./wavelength-conversion/355nm";
import { nm532WavelengthConversionLaser } from "./wavelength-conversion/532nm";
import { nm780WavelengthConversionLaser } from "./wavelength-conversion/780nm";
import { nm795WavelengthConversionLaser } from "./wavelength-conversion/795nm";

export const allProducts = [
  aseLightSource1p5um,
  aseLightSource1um,
  aseLightSource2um,
  broadbandLightSource,
  sledLightSource,
  highPowerFiberAmplifier,
  fiberAmplifierModules,
  polarizationMaintainingFiberAmplifier,
  highPowerSingleFrequency1_5um_0_2W,
  highPowerSingleFrequency1_5um_2_20W,
  highPowerSingleFrequency1_5um_20_120W,
  highPowerCWSingleFrequencyFiberLaser1_5um,
  highPowerSingleFrequency1um_0_2W,
  highPowerSingleFrequency1um_2_20W,
  highPowerSingleFrequency1um_20_500W,
  highPowerCWSingleFrequencyFiberLaser1um,
  highPowerSingleFrequency2um_0_05_2W,
  highPowerSingleFrequency2um_2_20W,
  highPowerSingleFrequency2um_20_500W,
  highPowerCWSingleFrequencyFiberLaser2um,
  kilowattLevelFiberLaserCombustionDiagnostics,
  longDistanceHighResolutionLidarFiberLaser,
  onePointFiveMicronNarrowLinewidthSeedLaser,
  onePointFiveMicronPhaseModulatedSeedLaser,
  oneMicronHighReliabilitySingleFrequencySeedSource,
  oneMicronIndustrialSingleFrequencySeedSource,
  oneMicronNarrowLinewidthSeedLaser,
  oneMicronFrequencyStabilizedSeedLaser,
  ultraLowNoiseSeedLaser,
  twoMicronPhaseModulatedFiberSeedSource,
  twoMicronSingleFrequencySeedLaser,
  onePointFiveMicronSingleFrequencyFiberLaser,
  onePointFiveMicronHighReliabilitySingleFrequencyFiberLaser,
  onePointFiveMicronIndustrialSingleFrequencyFiberLaser,
  oneMicronSingleFrequencyFiberLaser,
  twoMicronSingleFrequencyFiberLaser,
  twoMicronHighReliabilitySingleFrequencyFiberLaser,
  twoMicronIndustrialSingleFrequencyFiberLaser,
  broadbandUltraLowNoise,
  compactSingleFrequencyFiberLaser,
  magneticFieldDetectionLaser,
  narrowLinewidth,
  highSensitivitySensorStabilizedFiberLaser,
  frequencyStabilizedFiberLaser,
  ultraLowNoiseFiberLaserSeries,
  ultraNarrowLinewidth,
  pointLightSource1p5um,
  pointLightSource1um,
  pointLightSource2um,
  noiseTesting,
  spectralTesting,
  nm193WavelengthConversionLaser,
  nm266WavelengthConversionLaser,
  nm355WavelengthConversionLaser,
  nm532WavelengthConversionLaser,
  nm780WavelengthConversionLaser,
  nm795WavelengthConversionLaser,
];

export default allProducts;

export const PRODUCT_MAP: { [key: string]: any } = {
  "1-5um-ase": aseLightSource1p5um,
  "1um-ase": aseLightSource1um,
  "2um-ase": aseLightSource2um,
  "broadband": broadbandLightSource,
  "sled-ase": sledLightSource,
  "high-power": highPowerFiberAmplifier,
  "modules": fiberAmplifierModules,
  "pm": polarizationMaintainingFiberAmplifier,
  "1-5um-0-2w": highPowerSingleFrequency1_5um_0_2W,
  "1-5um-2-20w": highPowerSingleFrequency1_5um_2_20W,
  "1-5um-20-120w": highPowerSingleFrequency1_5um_20_120W,
  "1-5um-cw": highPowerCWSingleFrequencyFiberLaser1_5um,
  "1um-0-2w": highPowerSingleFrequency1um_0_2W,
  "1um-2-20w": highPowerSingleFrequency1um_2_20W,
  "1um-20-500w": highPowerSingleFrequency1um_20_500W,
  "1um-cw": highPowerCWSingleFrequencyFiberLaser1um,
  "2um-0-05-2w": highPowerSingleFrequency2um_0_05_2W,
  "2um-2-20w": highPowerSingleFrequency2um_2_20W,
  "2um-20-500w": highPowerSingleFrequency2um_20_500W,
  "2um-cw": highPowerCWSingleFrequencyFiberLaser2um,
  "kilowatt": kilowattLevelFiberLaserCombustionDiagnostics,
  "lidar": longDistanceHighResolutionLidarFiberLaser,
  "1-5um-narrow": onePointFiveMicronNarrowLinewidthSeedLaser,
  "1-5um-phase": onePointFiveMicronPhaseModulatedSeedLaser,
  "1um-high-reliability": oneMicronHighReliabilitySingleFrequencySeedSource,
  "1um-industrial": oneMicronIndustrialSingleFrequencySeedSource,
  "1um-narrow": oneMicronNarrowLinewidthSeedLaser,
  "1um-stabilized": oneMicronFrequencyStabilizedSeedLaser,
  "1um-ultra-low-noise": ultraLowNoiseSeedLaser,
  "2um-phase": twoMicronPhaseModulatedFiberSeedSource,
  "2um-single": twoMicronSingleFrequencySeedLaser,
  "1-5um": onePointFiveMicronSingleFrequencyFiberLaser,
  "1-5um-high-reliability": onePointFiveMicronHighReliabilitySingleFrequencyFiberLaser,
  "1-5um-industrial": onePointFiveMicronIndustrialSingleFrequencyFiberLaser,
  "1um": oneMicronSingleFrequencyFiberLaser,
  "2um": twoMicronSingleFrequencyFiberLaser,
  "2um-high-reliability": twoMicronHighReliabilitySingleFrequencyFiberLaser,
  "2um-industrial": twoMicronIndustrialSingleFrequencyFiberLaser,
  "broadband-low-noise": broadbandUltraLowNoise,
  "compact": compactSingleFrequencyFiberLaser,
  "magnetic-field": magneticFieldDetectionLaser,
  "narrow-linewidth": narrowLinewidth,
  "sensor-stabilized": highSensitivitySensorStabilizedFiberLaser,
  "stabilized": frequencyStabilizedFiberLaser,
  "ultra-low-noise": ultraLowNoiseFiberLaserSeries,
  "ultra-narrow-linewidth": ultraNarrowLinewidth,
  "1-5um-point": pointLightSource1p5um,
  "1um-point": pointLightSource1um,
  "2um-point": pointLightSource2um,
  "noise": noiseTesting,
  "spectral": spectralTesting,
  "193nm": nm193WavelengthConversionLaser,
  "266nm": nm266WavelengthConversionLaser,
  "355nm": nm355WavelengthConversionLaser,
  "532nm": nm532WavelengthConversionLaser,
  "780nm": nm780WavelengthConversionLaser,
  "795nm": nm795WavelengthConversionLaser,
};