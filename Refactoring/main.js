function statement(invoice) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let comedyCount = 0;
  let result = `Счет для ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2
  }).format;

  for (let i in invoice.performance) {
    let thisAmount = 0;
    let perf = invoice.performance[i];
    switch (perf.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30)
          thisAmount += 1000 * (perf.audience - 30);
        break;
      case "comedy":
        comedyCount++;
        thisAmount = 30000;
        if (perf.audience > 20)
          thisAmount += 10000 + 500 * (perf.audience - 20);
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`неизвестный тип: ${perf.type}`);
    }

    // Добавление бонусов
    volumeCredits += Math.max(perf.audience - 30, 0);

    // Дополнительный бонус за каждые 10 комедий
    if (perf.type === "comedy" && comedyCount % 10 == 0)
      volumeCredits += Math.floor(perf.audience / 5);

    // Вывод строки счета
    result += ` ${perf.playId}: ${format(thisAmount / 100)} (${perf.audience} мест)\n`;
    totalAmount += thisAmount;
  }
  result += `Итого с вас ${format(totalAmount / 100)}\n`
  result += `Вы заработали ${volumeCredits} бонусов\n`;
  return result;
}
