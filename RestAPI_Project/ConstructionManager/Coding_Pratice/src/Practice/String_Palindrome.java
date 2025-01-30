package Practice;

import java.util.Scanner;

public class String_Palindrome {
	
	public static void main (String [] args) {
		
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter a string : ");
		String str = sc.next();          //reading the string
		
		String rev = "";
		
		//reversing the string
		int length = str.length();
		for(int i=length-1; i>=0; i--) {
			rev = rev + str.charAt(i);
		}  //string reversed
		
		if(str.endsWith(rev)) {
			System.out.println("String is Palindrome ");
		}
		else {
			System.out.println("String is NOT palindrome ");
		}
	}
	
}
