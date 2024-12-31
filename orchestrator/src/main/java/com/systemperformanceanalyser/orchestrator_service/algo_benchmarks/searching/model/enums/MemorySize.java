package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum MemorySize {
    MB_128(128),
    MB_512(512),
    MB_1024(1024),
    MB_2048(2048),
    MB_4096(4096),
    MB_10240(10240);

    private final int value;

    MemorySize(int value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return value;
    }
}