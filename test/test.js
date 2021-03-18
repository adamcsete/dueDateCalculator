let dueDateCalculator = require('../dueDateCalculator');
let assert = require('assert');

describe('1 day ', function() {
  describe('#Expected: 2021-03-18 10:12', function() {
    it('Valid date and time on Wednesday with 1 day (8 hours) of turnaround time', function() {
      assert.strictEqual(dueDateCalculator.CalculateDueDate("2021-03-17 10:12",8), "2021-03-18 10:12");
    });
  });
});

describe('2 days ', function() {
    describe('#Expected: 2021-03-23 10:13', function() {
      it('Valid date and time on Friday with 2 days (16 hours) of turnaround time', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("2021-03-19 10:13", 16), "2021-03-23 10:13");
      });
    });
});

describe('Different separation ', function() {
    describe('#Expected: 2021-03-22 10:14', function() {
      it('Different date/time separation with valid date and time with 16 hours turnaround', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("2021.03.18:10:14", 16), "2021-03-22 10:14");
      });
    });
});

describe('Year, month, day change ', function() {
    describe('#Expected: 2021-01-01 12:15', function() {
      it('Valid date and time with year, month and day change (dec. 31 + 1 )', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("2020-12-31 12:15", 8), "2021-01-01 12:15");
      });
    });
});

describe('Saturday ', function() {
    describe('Expected: Submit date is not on working day.', function() {
      it('Invalid date, Saturday is not considered working day', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("2021-03-20 10:16", 16), "Submit date is not on working day.");
      });
    });
});

describe('Sunday ', function() {
    describe('Expected: Submit date is not on working day.', function() {
      it('Invalid date, Sunday is not considered working day', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("2021-03-21 10:17", 16), "Submit date is not on working day.");
      });
    });
});

describe('Before working hours ', function() {
    describe('Expected: Submit time is out of working hours.', function() {
      it('Invalid time, Monday is accepted, but 08:18 is ahead of working hours', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("2021-03-15 08:18", 16), "Submit time is out of working hours.");
      });
    });
});

describe('After working hours ', function() {
    describe('Expected: Submit time is out of working hours.', function() {
      it('Invalid time, Monday is accepted, but 17:19 is behind of working hours', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("2021-03-15 17:19", 16), "Submit time is out of working hours.");
      });
    });
});

describe('Invalid date/time format ', function() {
    describe('Expected: Invalid date/time format', function() {
      it('Invalid date/time format', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("03-17-2021 10:20", 16), "Invalid date/time format");
      });
    });
});

describe('Invalid turnaround time ', function() {
    describe('Expected: Invalid turnaround time', function() {
      it('Invalid turnaround time', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("2021-03-19 10:21"), "Invalid turnaround time");
      });
    });
});

describe('Date/time is missing', function() {
    describe('Expected: Date/time is missing', function() {
      it('Date/time is missing', function() {
        assert.strictEqual(dueDateCalculator.CalculateDueDate("", 16), "Date/time is missing");
      });
    });
});
