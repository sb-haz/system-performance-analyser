package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.AlgorithmType;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.LanguageType;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SearchResult {
    private String timestamp; // formatted string for displayin
    private long timestampRaw; // unix timestamp (ms) for calc
    private String algorithm;
    private String language;
    private int memory;
    private double timeTaken;
    private double memoryUsage;
    private double cpuUsage;
    private double cost;
    private Status status;
}