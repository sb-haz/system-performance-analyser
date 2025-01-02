package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.*;
import jakarta.validation.constraints.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
public class SearchResult {
    // metadata
    @NotNull(message = "timestamp must not be null")
    @NotEmpty(message = "timestamp must not be empty")
    private String timestamp;

    @Positive(message = "timestampRaw must be positive")
    private long timestampRaw;

    // input params
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

    // metrics
    @PositiveOrZero(message = "iterations must not be negative")
    private long iterations;

    @PositiveOrZero(message = "comparisons must not be negative")
    private long comparisons;

    @PositiveOrZero(message = "timeTaken must not be negative")
    private double timeTaken;

    @PositiveOrZero(message = "cost must not be negative")
    private double cost;

    // results
    @NotNull(message = "executionStatus must not be null")
    private ExecutionStatus executionStatus;

    @NotNull(message = "status must not be null")
    private SearchStatus searchStatus;

    @Min(value = -1, message = "foundIndex must be -1 or greater")
    private int foundIndex;
}