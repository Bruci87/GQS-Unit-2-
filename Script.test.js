const { determinarTriangulo, calcularPrecoComDesconto } = require('./functions');

describe('determinarTriangulo', () => {
    test('Deve retornar "Não é um triângulo válido" se algum lado for menor ou igual a 0', () => {
        expect(determinarTriangulo(0, 1, 2)).toBe("Não é um triângulo válido");
        expect(determinarTriangulo(1, -1, 2)).toBe("Não é um triângulo válido");
        expect(determinarTriangulo(1, 2, 0)).toBe("Não é um triângulo válido");
    });

    test('Deve retornar "Triângulo equilátero" se todos os lados forem iguais', () => {
        expect(determinarTriangulo(3, 3, 3)).toBe("Triângulo equilátero");
    });

    test('Deve retornar "Triângulo isósceles" se dois lados forem iguais', () => {
        expect(determinarTriangulo(3, 3, 2)).toBe("Triângulo isósceles");
        expect(determinarTriangulo(2, 3, 3)).toBe("Triângulo isósceles");
        expect(determinarTriangulo(3, 2, 3)).toBe("Triângulo isósceles");
    });

    test('Deve retornar "Triângulo escaleno" se todos os lados forem diferentes', () => {
        expect(determinarTriangulo(3, 4, 5)).toBe("Triângulo escaleno");
    });
});

describe('calcularPrecoComDesconto', () => {
    test('Deve aplicar 10% de desconto para compras entre 100 e 499.99', () => {
        expect(calcularPrecoComDesconto(100)).toBe("90.00");
        expect(calcularPrecoComDesconto(499.99)).toBe("449.99");
    });

    test('Deve aplicar 15% de desconto para compras entre 500 e 999.99', () => {
        expect(calcularPrecoComDesconto(500)).toBe("425.00");
        expect(calcularPrecoComDesconto(999.99)).toBe("849.99");
    });

    test('Deve aplicar 20% de desconto para compras a partir de 1000', () => {
        expect(calcularPrecoComDesconto(1000)).toBe("800.00");
        expect(calcularPrecoComDesconto(2000)).toBe("1600.00");
    });

    test('Deve retornar o valor original para compras menores que 100', () => {
        expect(calcularPrecoComDesconto(50)).toBe("50.00");
        expect(calcularPrecoComDesconto(99.99)).toBe("99.99");
    });
});
