val topics: List[List[String]] = List(
  List("Java", "Petri", "Race Condition"),
  List("Java", "Multicore", "Synchronized"),
  List("Synchronized", "Deadlock", "Java"))

def flatten: List[List[String]] => List[String] = exs =>
  for(xs <- exs; x <- xs) yield x

def count: List[String] => List[(String, Int)] = ws => {
  def helper: List[String] => List[(String, Int)] = {
    case Nil => Nil
    case a::b::xs if a == b => {
      val continuing = helper(b::xs)
      (a, continuing.head._2+1)::continuing.tail
    }
    case x::xs => (x, 1)::helper(xs)
  }
  helper(ws.sorted)
}

// Alternativ (abgewandelt vom stuve.pad):
//def count: List[String] => List[(String, Int)] = ws => {
//  def helper: List[String] => List[(String, Int)] = {
//    case Nil => Nil
//    case x::xs => (x, xs.takeWhile(_ == x).length + 1)::helper(xs.dropWhile(_ == x))
//  }
//  helper(ws.sorted)
//}

def getExamTopics: List[List[String]] => Int => List[String] =
  exs => n => {
    count(flatten(exs)).sortBy(_._2).map(_._1).take(n)
  }

@main
def mainK(): Unit = {
  println(flatten(List(List("A", "B"), List("C", "A")))) // == List("A", "B", "C", "A")
  println(count(List("A", "B", "C", "A"))) // == List(("A",2), ("B",1), ("C",1))
  println(getExamTopics(topics)(3)) // == List("Deadlock", "Multicore", "Petri")
}
