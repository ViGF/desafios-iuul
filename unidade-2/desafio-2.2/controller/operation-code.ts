class OperationStatus {
  static get SUCCESS() {
    return 1;
  }
  static get FAILURE() {
    return 2;
  }
}

class OperationErrors {
  static get UNABLE_TO_GET_TAX_RATE() {
    return 1;
  }
}

export { OperationStatus, OperationErrors }