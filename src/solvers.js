/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

window.factorial = function(n) {
  if (n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};


window.findNRooksSolution = function(n) {
  var solution = makeEmptyMatrix(n);

  for (var i = 0; i < n; i++) {
    solution[i][i] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var currentBoard = new Board({n: n});

  var recursiveHelper = function(rowIndex, currentBoard) { 
    if (rowIndex === currentBoard.get('n')) {
      return true;
    }

    for (var colIndex = 0; colIndex < currentBoard.get('n'); colIndex++) {
      currentBoard.togglePiece(rowIndex, colIndex);
      if (!currentBoard.hasAnyQueenConflictsOn(rowIndex, colIndex)) {
        if (recursiveHelper(rowIndex + 1, currentBoard)) {
          return true;
        }
      }
      currentBoard.togglePiece(rowIndex, colIndex);
    }
    return false;
  };

  recursiveHelper(0, currentBoard);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(currentBoard));
  return currentBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0;
  var currentBoard = new Board({n: n});
  var recursiveHelper = function(rowIndex, currentBoard) { 
    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    var endColIndex = n;
    if (rowIndex === 0) {
      if (n % 2 === 0) {
        endColIndex = endColIndex / 2;
      } else {
        endColIndex = (endColIndex - 1) / 2;
      }
    }

    for (var colIndex = 0; colIndex < endColIndex; colIndex++) {
      currentBoard.togglePiece(rowIndex, colIndex);
      if (!currentBoard.hasAnyQueenConflictsOn(rowIndex, colIndex)) {
        recursiveHelper(rowIndex + 1, currentBoard);
      }
      currentBoard.togglePiece(rowIndex, colIndex);
    }

    if (rowIndex === 0 && n % 2 === 1) {
      solutionCount *= 2;
      currentBoard.togglePiece(rowIndex, endColIndex);
      if (!currentBoard.hasAnyQueenConflictsOn(rowIndex, endColIndex)) {
        recursiveHelper(rowIndex + 1, currentBoard);
      }
      currentBoard.togglePiece(rowIndex, endColIndex);
    }
  };

  recursiveHelper(0, currentBoard);

  if (n % 2 === 0) {
    solutionCount *= 2; // only if n is even
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};