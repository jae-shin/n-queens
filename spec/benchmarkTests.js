var bench = new Benchmark('countNQueens',
  // The function to test
  function() {
    countNQueens(9);
  }
);

//bench.stats;