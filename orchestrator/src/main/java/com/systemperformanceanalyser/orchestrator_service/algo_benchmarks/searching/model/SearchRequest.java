package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.AlgorithmType;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.LanguageType;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.MemorySize;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.Region;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SearchRequest {
    private String array;
    private String target;
    private AlgorithmType algorithm;
    private LanguageType language;
    private MemorySize memorySize;
    private Region region;
}
