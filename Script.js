function determinarTriangulo(lado1, lado2, lado3) {
    // Verifica se é um triângulo válido
    if (lado1 <= 0 || lado2 <= 0 || lado3 <= 0) {
        return "Não é um triângulo válido";
    }
    // Verifica se é um triângulo equilátero (todos os lados iguais)
    if (lado1 === lado2 && lado2 === lado3) {
        return "Triângulo equilátero";
    }
    // Verifica se é um triângulo isósceles (dois lados iguais)
    if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
        return "Triângulo isósceles";
    }
    // Se não for nenhum dos acima, é um triângulo escaleno (todos os lados diferentes)
    return "Triângulo escaleno";
}
function calcularPrecoComDesconto(valorCompra) {
    let desconto = 0;
    // Aplicar desconto com base no valor da compra
    if (valorCompra >= 100 && valorCompra < 500) {
        desconto = 10; // 10% de desconto para compras entre 100 e 499.99
    } else if (valorCompra >= 500 && valorCompra < 1000) {
        desconto = 15; // 15% de desconto para compras entre 500 e 999.99
    } else if (valorCompra >= 1000) {
        desconto = 20; // 20% de desconto para compras a partir de 1000
    }
    // Calcular o preço final com desconto
    const precoComDesconto = valorCompra * (1 - desconto / 100);
    // Retornar o preço com desconto arredondado para duas casas decimais
    return precoComDesconto.toFixed(2);
}
module.exports = { determinarTriangulo, calcularPrecoComDesconto };

