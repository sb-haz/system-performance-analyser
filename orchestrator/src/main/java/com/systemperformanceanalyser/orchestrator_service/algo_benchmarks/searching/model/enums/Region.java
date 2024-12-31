package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Region {
    @JsonProperty("eu-west-2") EU_WEST_2,
    @JsonProperty("us-east-1") US_EAST_1,
    @JsonProperty("eu-central-1") EU_CENTRAL_1
}