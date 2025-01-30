package Practice;

import java.util.Scanner;

public class Prime_No {

	public static void main(String[] args) {
		
		Scanner sc = new Scanner (System.in);
		
		System.out.println("enter No : ");
		int num = sc.nextInt();
		
		if(isPrime(num)) {
			System.out.println(num + "is a prime no.");
		}
		else {
			System.out.println(num + "is NOT prime no.");
		}
		
		sc.close();
	}
	
	public static boolean isPrime(int num) {
		if(num <= 1) {
			return false;
		}
		
		for(int i = 2; i<=num / 2; i++) {
			if(num % i == 0) {
				return false;
			}
		}
		
		return true;
	}	
}