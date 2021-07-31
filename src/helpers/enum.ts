export enum StatusCode {
    // Generic Success 1-20
    operationCompleted = 1,
    insertCompleted = 2,
    // Generic Exceptions 100-199
    genericException = 100,
    noRecordFound = 101,
    validationError = 102,
    databaseError = 103
}
