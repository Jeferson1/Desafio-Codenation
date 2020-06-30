package br.com.codenation.desafioexe;

import java.util.ArrayList;
import java.util.List;

public class DesafioApplication {

	public static List<Integer> fibonacci() {

		List<Integer> list = new ArrayList<Integer>();

		int operator = 0;
		int operand = 1;
		int aux;

		do {
			list.add(operator);

			aux = operator + operand;
			operator = operand;
			operand = aux;
		} while (operator <= 377);

		return  list;
	}

	public static Boolean isFibonacci(Integer a) {
		if (fibonacci().contains(a)) {
			return true;
		} else {
			return false;
		}
	}

	public static void main( String[] args ) {
		System.out.println(fibonacci());
	}
}