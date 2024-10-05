+++
title = "PFP Klausur SoSe 2021"
date = "2024-02-06"
description = "Lösung der PFP-Klausur vom Sommersemester 2021 im Rahmen der Tafelübung."
[taxonomies]
tags = ["pfp", "fau"]
[extra]
cover.image = "images/black-mountains.jpg"
+++

# Aufgabe 1 (Wissensfragen)

**a)** 1 & 4

**b)** 1 & 3

**c)** 1 & 4

# Aufgabe 2 (Schreibtischlauf)

## a)

**i)** Ja, weil nach dem Starten von `t` dieser den Wert von `answer` setzen kann. Falls die Ausgabe nach dieser Änderung ausgeführt wird und der Main-Thread die Änderung sieht, ist oben genannte Ausgabe möglich.

**ii)** Ja, weil es aufgrund der fehlenden Synchronisation passieren kann, dass der Main-Thread die Ausgabe tätigt, noch bevor `t` den Wert von `answer` verändert hat. 
(Alternativ: Ja, weil die Änderung für den Main-Thread wegen fehlender Synchronisation nicht garantiert sichtbar ist. Somit kann selbst bei einer Änderung von `t` noch der alte Wert ausgegeben werden.)

**iii)** Ja, weil die Änderung eines `double` nicht garantiert atomar ist. Falls die Ausgabe genau während der Veränderung passiert und die partielle Änderung sichtbar ist, kann auch dieser partiell beschriebene Wert ausgegeben werden.

**iv)** Nein, weil in dem Programm weder potentiell endlos laufende Schleifen noch potentiell deadlockende Synchronisationspunkte enthalten sind. Somit terminiert das Programm garantiert immer und der Main-Thread tätigt eine Ausgabe.

## b)

**i)** Nein, weil `a` insgesamt nur zwei mal inkrementiert wird. Es kann also nie den Wert `3` erreichen.

**ii)** Ja, weil die Inkrementierung von `a` weder atomar noch synchronisiert ist. Es kann also passieren, dass beide `T`-Threads gleichzeitig den Wert `0` lesen (bzw wegen fehlender Sichtbarkeitssynchronisation die Änderung des anderen Threads gar nicht mitbekommen), inkrementieren und somit beide `1` in die Variable `a` schreiben.

**iii)** Nein, weil der Zugriff auf `b` synchronisiert ist. `b` wird garantiert durch Aufaddieren von `a` (dessen kleinstmöglicher Wert `1` ist) geändert. Durch die `CyclicBarrier` wird auch Sichtbarkeit zum Main-Thread garantiert.

**iv)** Nein, weil `b` synchronisiert von zwei Threads geändert wird. Diese beiden Threads addieren jeweils den Wert von `a`, der minimal `1` ist. Dadurch ist der kleinstmögliche Wert von `b` `2`. Diese Änderungen sind dank der `CyclicBarrier` auch für den Main-Thread sichtbar.

**v)** Ja, weil die Inkrementierung von `c` nicht atomar ist. Auch wenn diese in einen `synchronized`-Block gekapselt ist, führt dies wegen den unterschiedlichen Synchronisationsmarken (eigene Thread-Objekte) nicht zu einer Synchronisation.

**vi)** Ja, weil auch hier die Inkrementierung von `d` weder atomar noch synchronisiert ist. Die Methoden eines `AtomicInteger` sind nur für sich selbst gesehen atomar, allerdings nicht wenn diese nacheinander aufgerufen werden.

**vii)** Ja, weil der Main-Thread insgesamt fünf mal an der Barriere wartet. Die Subthreads selbst warten allerdings nur vier mal an dieser. Wenn der Main-Thread also in Zeile 26 wartet, wird dieser die Barriere niemals passieren können, da eben kein anderer Thread mehr an der Barriere wartet. Das Programm terminiert somit nie.

# Aufgabe 3 (Mandelbrot)

```java
import java.util.concurrent.*;

public class Mandelbrot {
    private final int POISON_PILL = -42;
    private final BlockingQueue<Integer> queue =
        new LinkedBlockingDeque<Integer>();
    public boolean [][] field;
    Worker[] workers;

    public void compute (boolean[][] field, int nThreads){
		// 1
		this.field = field;
		workers = new Worker[nThreads];

		for (int i = 0; i < nThreads; i++) {
			workers[i] = new Worker();
			workers[i].start();
		}

		// 2
		for (int i = 0; i < field.length; i++) {
			queue.add(i);
		}

		for (int i = 0; i < nThreads; i++) {
			queue.add(POISON_PILL);
		}

		for (Worker worker : workers) {
			try {
				worker.join();
			} catch (Exception e) { }
		}
    } // END COMPUTE

    class Worker extends Thread {
        public void run() {
			// 3
			int column;
			try {
				while (true) {
					column = queue.take();

					if (column == POISON_PILL) {
						break;
					}

					for (int row = 0; row < field[0].length; row++) {
						field[column][row] = check(column, row);
					}
				}
			} catch (Exception e) { }

        } // END RUN

        boolean check(int x, int y) {...}
    }
}
```
{% align(type="center") %}
{{ downloader(file_path="/downloads/Mandelbrot.java", download_name="Mandelbrot.java") }} {{ downloader(file_path="/downloads/MandelbrotVisualizer.java", download_name="MandelbrotVisualizer.java") }}
{% end %}

# Aufgabe 4 (Petri-Netz)

## a)

![Petri-Netz](/images/petri-ss21.png)

**b)** `[1, 1, 2, 4, 3]`

**c)** Keine Transition ist lebendig, da bei dieser Belegung nach einem Feuern von `t1` keine Transition mehr schalten kann.

# Aufgabe 5 (Scala: Klausurstoff)

```scala
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
def count: List[String] => List[(String, Int)] = ws => {
  def helper: List[String] => List[(String, Int)] = {
    case Nil => Nil
    case x::xs => (x, xs.takeWhile(_ == x).length + 1)::helper(xs.dropWhile(_ == x))
  }
  helper(ws.sorted)
}

def getExamTopics: List[List[String]] => Int => List[String] =
  exs => n => {
    count(flatten(exs)).sortBy(_._2).map(_._1).take(n)
  }
```

{% align(type="center") %}
{{ downloader(file_path="/downloads/Klausurstoff.scala", download_name="Klausurstoff.scala", p=true) }}
{% end %}

# Aufgabe 6 (Scala: Queens)

```scala
def getFreeRows: List[Field] => List[Row] = qs =>
  rows.filter(!qs.map(_._2).contains(_))

// Alternativ
def getFreeRows: List[Field] => List[Row] = qs =>
  rows.filter(r => !qs.exists(_._2 == r))

def getFreeFieldsInRow: List[Field] => Row => List[Field] = qs => row =>
  for (col <- cols if qs.filter(q => beats(q)((col, row))).length == 0) yield (col, row)

// Alternativ
def getFreeFieldsInRow: List[Field] => Row => List[Field] = qs => row =>
  for (col <- cols if !qs.exists(beats((col, row)))) yield (col, row)

def solve: List[Field] => List[Field] = queens => {
  getFreeRows(queens) match {
    case Nil => queens
    case r::_ => getFreeFieldsInRow(queens)(r).foldLeft(List[Field]())((res, trying) => {
      val now = solve(trying::queens) // Platzierung ausprobieren
      if (res.length < now.length) now else res // bisher beste nehmen
    })
  }
}
```

{% align(type="center") %}
{{ downloader(file_path="/downloads/Queens.scala", download_name="Queens.scala") }}
{% end %}
