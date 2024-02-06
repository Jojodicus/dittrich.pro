type Col = Char // chess board column index
type Row = Int // chess board row index
val cols = List('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')
val rows = List(1, 2, 3, 4, 5, 6, 7, 8)
type Field = (Col, Row) // field within chess board
def sameColumn: (Field, Field) => Boolean = (a, b) => a._1 == b._1
def sameRow: (Field, Field) => Boolean = (a, b) => a._2 == b._2
def sameDiagonal: (Field, Field) => Boolean =
  (a, b) => (a._1 - b._1).abs == (a._2 - b._2).abs
def beats: Field => Field => Boolean =
  a => b => sameColumn(a, b) || sameRow(a, b) || sameDiagonal(a, b)

def getFreeRows: List[Field] => List[Row] = qs =>
  rows.filter(!qs.map(_._2).contains(_))

// Alternativ
//def getFreeRows: List[Field] => List[Row] = qs =>
//  rows.filter(r => !qs.exists(_._2 == r))

def getFreeFieldsInRow: List[Field] => Row => List[Field] = qs => row =>
  for (col <- cols if qs.filter(q => beats(q)((col, row))).length == 0) yield (col, row)

// Alternativ
//def getFreeFieldsInRow: List[Field] => Row => List[Field] = qs => row =>
//  for (col <- cols if !qs.exists(beats((col, row)))) yield (col, row)

def solve: List[Field] => List[Field] = queens => {
  getFreeRows(queens) match {
    case Nil => queens
    case r::_ => getFreeFieldsInRow(queens)(r).foldLeft(List[Field]())((res, trying) => {
      val now = solve(trying::queens) // Platzierung ausprobieren
      if (res.length < now.length) now else res // bisher beste nehmen
    })
  }
}

@main
def main(): Unit = {
  println(getFreeRows(List(('a', 4), ('c', 6), ('h', 1)))) // == List(2, 3, 5, 7, 8)
  val solved = solve(Nil)
  println(solve(Nil))
  // check
  for(q1@(c1, r1) <- solved; q2@(c2, r2) <- solved.takeWhile(_ != q1) if beats(q1)(q2))
    printf("%c%d beats %c%d%n", c1, r1, c2, r2)
}