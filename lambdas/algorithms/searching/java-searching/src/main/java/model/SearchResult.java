package model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SearchResult {
    // metadata
    private String timestamp;
    private long timestampRaw;

    // input params
    private String array;
    private String target;
    private String algorithm;
    private String language;
    private String memorySize;
    private String region;

    // metrics
    private long iterations;
    private long comparisons;
    private double timeTaken;
    private double cost;

    // results
    private String executionStatus;
    private String searchStatus;
    private int foundIndex;
}