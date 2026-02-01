import java.util.concurrent.*;

public class Mandelbrot {
	private final int POISON_PILL = -42;
	private final BlockingQueue<Integer> queue =
			new LinkedBlockingDeque<Integer>();
	public boolean[][] field;
	Worker[] workers;

	public void compute(boolean[][] field, int nThreads) {
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

		boolean check(int x, int y) {
			// stolen from Joern Hameister
			double real = 2.0 * x / field.length - 1.5;
			double imag = 2.0 * y / field[0].length - 1;

			double zi = 0;
			double z = 0;
			for (int i = 0; i < 200; i++) {
				double ziT = 2 * (z * zi);
				double zT = z * z - (zi * zi);
				z = zT + real;
				zi = ziT + imag;

				if (z * z + zi * zi >= 4.0) {
					return false;
				}
			}
			return true;
		}
	}
}