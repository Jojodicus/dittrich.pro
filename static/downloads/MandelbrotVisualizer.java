import javax.swing.*;
import java.awt.*;

public class MandelbrotVisualizer extends JPanel {
	private boolean[][] field;

	public MandelbrotVisualizer(boolean[][] field) {
		this.field = field;
		setPreferredSize(new Dimension(field.length, field[0].length));
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		int cellWidth = getWidth() / field.length;
		int cellHeight = getHeight() / field[0].length;

		for (int i = 0; i < field.length; i++) {
			for (int j = 0; j < field[i].length; j++) {
				if (field[i][j]) {
					g.setColor(Color.BLACK);
				} else {
					g.setColor(Color.WHITE);
				}
				g.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
			}
		}
	}

	public static void main(String[] args) {
		boolean[][] field = new boolean[400][400];
		Mandelbrot mandelbrot = new Mandelbrot();

		// time sequential
		long start = System.nanoTime();
		mandelbrot.compute(field, 1);
		long end = System.nanoTime() - start;
		System.out.printf("1 Thread took: %fms%n", end/1000000.0);

		// time parallel
		field = new boolean[400][400];
		int threads = Runtime.getRuntime().availableProcessors();
		start = System.nanoTime();
		mandelbrot.compute(field, threads);
		end = System.nanoTime() - start;
		System.out.printf("%d Threads took: %fms%n", threads, end/1000000.0);

		// paint
		final boolean[][] final_field = field;
		SwingUtilities.invokeLater(() -> {
			JFrame frame = new JFrame("Mandelbrot");
			frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			MandelbrotVisualizer arrayGUI = new MandelbrotVisualizer(final_field);
			frame.add(arrayGUI);
			frame.pack();
			frame.setVisible(true);
		});
	}
}