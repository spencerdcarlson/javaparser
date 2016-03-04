class Rocket {
	private void blastOff() { System.out.print("bang "); }
}
public class Shuttle extends Rocket {
	public static void main(String[] args) {
		new Shuttle().go();
	}
	void go() {
		blastOff();
		// Rocket.blastOff();	// line A
	}
	private void blastOff() { System.out.print("sh-bang "); }
}
// @IFQA @comment this file has all of the test cases for javaparser

/**
* This comment should be in the code
**/

/** @IFQA multiline inline **/
/** multiline inline **/

/**
* @IFQA
* @Command $ javac Shuttle.java && java Shuttle
* @Chapter 1
* @Question 2
* @QText Which are true? (Choose all that apply.)
* @Option A. As the code stands, the output is bang
* @Option B. As the code stands, the output is sh-bang
* @Option C. As the code stands, compilation fails.
* @Option D. If line A is uncommented, the output is bang bang
* @Option E. If line A is uncommented, the output is sh-bang bang
* @Option F. If line A is uncommented, compilation fails.
**/


/**
* @IFQA
* @Answer B, F
* @Exp Since Rocket.blastOff() is private, it can't be overriden,
* and it is invisible to class Shuttle.
* but does this line work?
**/