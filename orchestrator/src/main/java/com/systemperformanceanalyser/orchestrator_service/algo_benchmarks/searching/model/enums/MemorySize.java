package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums;

import lombok.Getter;

@Getter
public enum MemorySize {
    MB_128(128),
    MB_256(256),
    MB_512(512),
    MB_1024(1024),
    MB_2048(2048);

    private final int value;

    MemorySize(int value) {
        this.value = value;
    }

}