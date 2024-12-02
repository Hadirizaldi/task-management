export const Priority = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  isValid: function (value) {
    return [this.LOW, this.MEDIUM, this.HIGH].includes(value);
  },
}