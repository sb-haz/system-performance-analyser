package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class SearchRequest {
    @NotNull(message = "array must not be null")
    @NotEmpty(message = "array must not be empty")
    private String array;

    @NotNull(message = "target must not be null")
    @NotEmpty(message = "target must not be empty")
    private String target;

    @NotNull(message = "algorithm must not be null")
    private AlgorithmType algorithm;

    @NotNull(message = "language must not be null")
    private LanguageType language;

    @NotNull(message = "memorySize must not be null")
    private MemorySize memorySize;

    @NotNull(message = "region must not be null")
    private Region region;
}
