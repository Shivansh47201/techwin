
import { aseLightSource1p5um } from "./ase-sources/1-5um-ase";
import { aseLightSource1um } from "./ase-sources/1um-ase";
import { aseLightSource2um } from "./ase-sources/2um-ase";
import { broadbandLightSource } from "./ase-sources/broadband";
import { sledLightSource } from "./ase-sources/sled-ase";

<<<<<<< HEAD
import { polarizationMaintainingFiberAmplifier } from "./fiber-amplifiers/pm";
import { highPowerFiberAmplifier } from "./fiber-amplifiers/high-power";
import { fiberAmplifierModules } from "./fiber-amplifiers/modules";
=======
import { polarizationMaintainingFiberAmplifier } from "./Fiber-Amplifiers/polarization-maintaining-fiber-amplifier";
import { highPowerFiberAmplifier } from "./Fiber-Amplifiers/high-power-fiber-amplifier";
import { fiberAmplifierModules } from "./Fiber-Amplifiers/fiber-amplifier-modules";
>>>>>>> origin/main

import { kilowattLevelFiberLaserCombustionDiagnostics } from "./high-power/kilowatt";
import { highPowerCWSingleFrequencyFiberLaser1um } from "./high-power/1um-cw";
import { highPowerCWSingleFrequencyFiberLaser1_5um } from "./high-power/1-5um-cw";
import { highPowerCWSingleFrequencyFiberLaser2um } from "./high-power/2um-cw";
import { longDistanceHighResolutionLidarFiberLaser } from "./high-power/lidar";
import { highPowerSingleFrequency1um_0_2W } from "./high-power/1um-0-2w";
import { highPowerSingleFrequency1um_2_20W } from "./high-power/1um-2-20w";
import { highPowerSingleFrequency1um_20_500W } from "./high-power/1um-20-500w";
import { highPowerSingleFrequency1_5um_0_2W } from "./high-power/1-5um-0-2w";
import { highPowerSingleFrequency1_5um_2_20W } from "./high-power/1-5um-2-20w";
import { highPowerSingleFrequency1_5um_20_120W } from "./high-power/1-5um-20-120w";
import { highPowerSingleFrequency2um_0_05_2W } from "./high-power/2um-0-05-2w";
import { highPowerSingleFrequency2um_2_20W } from "./high-power/2um-2-20w";
import { highPowerSingleFrequency2um_20_500W } from "./high-power/2um-20-500w";


import { pointLightSource1um } from "./sled/1um-point";
import { pointLightSource1p5um } from "./sled/1-5um-point";
import { pointLightSource2um } from "./sled/2um-point";

<<<<<<< HEAD
import { oneMicronNarrowLinewidthSeedLaser } from "./Seed-Lasers/1um-narrow";
import { oneMicronFrequencyStabilizedSeedLaser } from "./Seed-Lasers/1um-stabilized";
import { ultraLowNoiseSeedLaser } from "./Seed-Lasers/1um-ultra-low-noise";
import { onePointFiveMicronNarrowLinewidthSeedLaser } from "./Seed-Lasers/1-5um-narrow";
import { onePointFiveMicronPhaseModulatedSeedLaser } from "./Seed-Lasers/1-5um-phase";
import { twoMicronSingleFrequencySeedLaser } from "./Seed-Lasers/2um-single";
import { twoMicronPhaseModulatedFiberSeedSource } from "./Seed-Lasers/2um-phase";
import { oneMicronIndustrialSingleFrequencySeedSource } from "./Seed-Lasers/1um-industrial";
import { oneMicronHighReliabilitySingleFrequencySeedSource } from "./Seed-Lasers/1um-high-reliability";
=======
import { oneMicronSingleFrequencyFiberLaser } from "./Single-Frequency-Fiber-Lasers/1.0um-single-frequency-fiber-laser";
import { onePointFiveMicronSingleFrequencyFiberLaser } from "./Single-Frequency-Fiber-Lasers/1.5um-single-frequency-fiber-laser";
import { twoMicronSingleFrequencyFiberLaser } from "./Single-Frequency-Fiber-Lasers/2.0um-single-frequency-fiber-laser";
import { highSensitivitySensorStabilizedFiberLaser } from "./Single-Frequency-Fiber-Lasers/high-sensitivity-sensor-stabilized-fiber-laser";
import { magneticFieldDetectionLaser } from "./Single-Frequency-Fiber-Lasers/magnetic-field-detection-laser";
import { frequencyStabilizedFiberLaser } from "./Single-Frequency-Fiber-Lasers/frequency-stabilized-fiber-laser";
import { broadbandUltraLowNoise } from "./Single-Frequency-Fiber-Lasers/broadband-ultra-low-noise-fiber-laser";
import {ultraNarrowLinewidth} from "./Single-Frequency-Fiber-Lasers/ultra-narrow-linewidth";
import {narrowLinewidth} from "./Single-Frequency-Fiber-Lasers/narrow-linewidth";
import {ultraLowNoiseFiberLaserSeries} from "./Single-Frequency-Fiber-Lasers/ultra-low-noise";
>>>>>>> origin/main


import { oneMicronSingleFrequencyFiberLaser } from "./single-frequency/1um";
import { onePointFiveMicronSingleFrequencyFiberLaser } from "./single-frequency/1-5um";
import { twoMicronSingleFrequencyFiberLaser } from "./single-frequency/2um";
import { highSensitivitySensorStabilizedFiberLaser } from "./single-frequency/sensor-stabilized";
import { magneticFieldDetectionLaser } from "./single-frequency/magnetic-field";
import { frequencyStabilizedFiberLaser } from "./single-frequency/stabilized";
import { broadbandUltraLowNoise } from "./single-frequency/broadband-low-noise";
import {ultraNarrowLinewidth} from "./single-frequency/ultra-narrow-linewidth";
import {narrowLinewidth} from "./single-frequency/narrow-linewidth";
import {ultraLowNoiseFiberLaserSeries} from "./single-frequency/ultra-low-noise";
//new
import { onePointFiveMicronHighReliabilitySingleFrequencyFiberLaser } from "./single-frequency/1-5um-high-reliability";
import { onePointFiveMicronIndustrialSingleFrequencyFiberLaser } from "./single-frequency/1-5um-industrial";
import { twoMicronHighReliabilitySingleFrequencyFiberLaser } from "./single-frequency/2um-high-reliability";
import { twoMicronIndustrialSingleFrequencyFiberLaser } from "./single-frequency/2um-industrial";
import { compactSingleFrequencyFiberLaser } from "./single-frequency/compact";


import { spectralTesting } from "./testing/spectral";
import { noiseTesting } from "./testing/noise";

import { nm193WavelengthConversionLaser } from "./wavelength-conversion/193nm";
import { nm266WavelengthConversionLaser } from "./wavelength-conversion/266nm";
import { nm355WavelengthConversionLaser } from "./wavelength-conversion/355nm";
import { nm532WavelengthConversionLaser } from "./wavelength-conversion/532nm";
import { nm780WavelengthConversionLaser } from "./wavelength-conversion/780nm";
import { nm795WavelengthConversionLaser } from "./wavelength-conversion/795nm";

// Map slug → product for quick lookup
export const PRODUCT_MAP: Record<string, any> = {
  // ASE Sources
  "1um-ase": aseLightSource1um,
  "1-5um-ase": aseLightSource1p5um,
  "2um-ase": aseLightSource2um,
  "broadband": broadbandLightSource,
  "sled-ase": sledLightSource,

  // Fiber Amplifiers
<<<<<<< HEAD
  "pm": polarizationMaintainingFiberAmplifier,
  "high-power": highPowerFiberAmplifier,
  "modules": fiberAmplifierModules,

// High-Power Fiber Lasers
  kilowatt: kilowattLevelFiberLaserCombustionDiagnostics,
  "1um-0-2w": highPowerSingleFrequency1um_0_2W,
  "1um-2-20w": highPowerSingleFrequency1um_2_20W,
  "1um-20-500w": highPowerSingleFrequency1um_20_500W,
  "1-5um-0-2w": highPowerSingleFrequency1_5um_0_2W,
  "1-5um-2-20w": highPowerSingleFrequency1_5um_2_20W,
  "1-5um-20-120w": highPowerSingleFrequency1_5um_20_120W,
  "2um-0-05-2w": highPowerSingleFrequency2um_0_05_2W,
  "2um-2-20w": highPowerSingleFrequency2um_2_20W,
  "2um-20-500w": highPowerSingleFrequency2um_20_500W,
  "1um-cw": highPowerCWSingleFrequencyFiberLaser1um,
  "1-5um-cw": highPowerCWSingleFrequencyFiberLaser1_5um,
  "2um-cw": highPowerCWSingleFrequencyFiberLaser2um,
  lidar: longDistanceHighResolutionLidarFiberLaser,

=======
  "polarization-maintaining-fiber-amplifier": polarizationMaintainingFiberAmplifier,
  "high-power-fiber-amplifier": highPowerFiberAmplifier,
  "fiber-amplifier-modules": fiberAmplifierModules,

  // High-Power Fiber Lasers
  "kilowatt-level-fiber-laser-combustion-diagnostics": kilowattLevelFiberLaserCombustionDiagnostics,
  "high-power-cw-single-frequency-fiber-laser-1um": highPowerCWSingleFrequencyFiberLaser1um,
  "high-power-cw-single-frequency-fiber-laser-1.5um": highPowerCWSingleFrequencyFiberLaser1_5um,
  "high-power-cw-single-frequency-fiber-laser-1-5um": highPowerCWSingleFrequencyFiberLaser1_5um,
  "high-power-cw-single-frequency-fiber-laser-2um": highPowerCWSingleFrequencyFiberLaser2um,
  "long-distance-high-resolution-lidar-fiber-laser": longDistanceHighResolutionLidarFiberLaser,
>>>>>>> origin/main

  // Point Light Sources
  "1um-point": pointLightSource1um,
  "1-5um-point": pointLightSource1p5um,
  "2um-point": pointLightSource2um,

  // Seed Lasers
  "1um-narrow": oneMicronNarrowLinewidthSeedLaser,
  "1um-stabilized": oneMicronFrequencyStabilizedSeedLaser,
  "1um-ultra-low-noise": ultraLowNoiseSeedLaser,
  "1-5um-narrow": onePointFiveMicronNarrowLinewidthSeedLaser,
  "1-5um-phase": onePointFiveMicronPhaseModulatedSeedLaser,
  "2um-single": twoMicronSingleFrequencySeedLaser,
  "2um-phase": twoMicronPhaseModulatedFiberSeedSource,
  "1um-industrial": oneMicronIndustrialSingleFrequencySeedSource,
  "1um-high-reliability": oneMicronHighReliabilitySingleFrequencySeedSource,

  // Single-Frequency Fiber Lasers
  // Map both filename-based keys and slug-based keys for lookup flexibility
<<<<<<< HEAD
  "1um": oneMicronSingleFrequencyFiberLaser,
  "1-5um": onePointFiveMicronSingleFrequencyFiberLaser,
  "2um": twoMicronSingleFrequencyFiberLaser,
  "ultra-narrow-linewidth": ultraNarrowLinewidth,
  "ultra-low-noise": ultraLowNoiseFiberLaserSeries,
  "narrow-linewidth": narrowLinewidth,    
  "sensor-stabilized": highSensitivitySensorStabilizedFiberLaser,
  "magnetic-field": magneticFieldDetectionLaser,
  "stabilized": frequencyStabilizedFiberLaser,
  "broadband-low-noise": broadbandUltraLowNoise,
  
  "1-5um-high-reliability": onePointFiveMicronHighReliabilitySingleFrequencyFiberLaser,
  "1-5um-industrial": onePointFiveMicronIndustrialSingleFrequencyFiberLaser,
  "2um-high-reliability": twoMicronHighReliabilitySingleFrequencyFiberLaser,
  "2um-industrial": twoMicronIndustrialSingleFrequencyFiberLaser,
  "compact": compactSingleFrequencyFiberLaser,
=======
  "1.0um-single-frequency-fiber-laser": oneMicronSingleFrequencyFiberLaser,
  "1um": oneMicronSingleFrequencyFiberLaser,
  "1.5um-single-frequency-fiber-laser": onePointFiveMicronSingleFrequencyFiberLaser,
  "1-5um": onePointFiveMicronSingleFrequencyFiberLaser,
  "2.0um-single-frequency-fiber-laser": twoMicronSingleFrequencyFiberLaser,
  "2um": twoMicronSingleFrequencyFiberLaser,
  "ultra-narrow-linewidth-fiber-laser": ultraNarrowLinewidth,
  "ultra-narrow-linewidth": ultraNarrowLinewidth,
  "ultra-low-noise-fiber-laser-series": ultraLowNoiseFiberLaserSeries,
  "ultra-low-noise": ultraLowNoiseFiberLaserSeries,
  "narrow-linewidth-fiber-laser": narrowLinewidth,   
  "narrow-linewidth": narrowLinewidth,    
  "high-sensitivity-sensor-stabilized-fiber-laser": highSensitivitySensorStabilizedFiberLaser,
  "sensor-stabilized": highSensitivitySensorStabilizedFiberLaser,
  "magnetic-field-detection-laser": magneticFieldDetectionLaser,
  "magnetic-field": magneticFieldDetectionLaser,
  "frequency-stabilized-fiber-laser": frequencyStabilizedFiberLaser,
  "stabilized": frequencyStabilizedFiberLaser,
  "broadband-ultra-low-noise-fiber-laser": broadbandUltraLowNoise,
  "broadband-low-noise": broadbandUltraLowNoise,
>>>>>>> origin/main

  // Testing Systems
  "spectral": spectralTesting,
  "noise": noiseTesting,

  // Wavelength Conversion
  "193nm": nm193WavelengthConversionLaser,
  "266nm": nm266WavelengthConversionLaser,
  "355nm": nm355WavelengthConversionLaser,
  "532nm": nm532WavelengthConversionLaser,
  "780nm": nm780WavelengthConversionLaser,
  "795nm": nm795WavelengthConversionLaser,
};
