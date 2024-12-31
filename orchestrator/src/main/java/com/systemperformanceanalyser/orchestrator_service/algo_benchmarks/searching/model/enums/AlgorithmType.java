package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum AlgorithmType {
    @JsonProperty("linear") LINEAR,
    @JsonProperty("binary") BINARY,
    @JsonProperty("jump") JUMP,
    @JsonProperty("interpolation") INTERPOLATION
}
