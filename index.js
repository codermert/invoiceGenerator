var readline = require('readline');
var easyinvoice = require('easyinvoice');
var fs = require('fs');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var products = [];

function addProduct() {
    rl.question('Ürün Açıklaması: ', function (description) {
        rl.question('Ürün Miktarı: ', function (quantity) {
            rl.question('Ürün KDV Oranı: ', function (taxRate) {
                rl.question('Ürün Fiyatı: ', function (price) {
                    products.push({
                        "quantity": quantity,
                        "description": description,
                        "tax-rate": taxRate,
                        "price": price
                    });

                    rl.question('Başka ürün eklemek istiyor musunuz? (Evet/Hayır): ', function (answer) {
                        if (answer.toLowerCase() === 'evet') {
                            addProduct();
                        } else {
                            rl.question('Gönderici Şirket Adı: ', function (senderCompany) {
                                rl.question('Gönderici Adresi: ', function (senderAddress) {
                                    rl.question('Gönderici Posta Kodu: ', function (senderZip) {
                                        rl.question('Alıcı Şirket Adı: ', function (clientCompany) {
                                            rl.question('Alıcı Adresi: ', function (clientAddress) {
                                                rl.question('Alıcı Posta Kodu: ', function (clientZip) {
                                                    rl.question('Fatura Numarası: ', function (invoiceNumber) {
                                                        rl.question('Fatura Tarihi (GG-AA-YYYY): ', function (invoiceDate) {
                                                            rl.question('Vade Tarihi (GG-AA-YYYY): ', function (dueDate) {
                                                                rl.close();

                                                                var data = {
                                                                    "images": {
                                                                        "logo": "https://upload.wikimedia.org/wikipedia/de/thumb/4/42/Software_AG_logo.svg/2560px-Software_AG_logo.svg.png"
                                                                    },
                                                                    "sender": {
                                                                        "company": senderCompany,
                                                                        "address": senderAddress,
                                                                        "zip": senderZip
                                                                    },
                                                                    "client": {
                                                                        "company": clientCompany,
                                                                        "address": clientAddress,
                                                                        "zip": clientZip
                                                                    },
                                                                    "information": {
                                                                        "number": invoiceNumber,
                                                                        "date": invoiceDate,
                                                                        "due-date": dueDate
                                                                    },
                                                                    "products": products,
                                                                    "bottom-notice": "Lütfen faturanızı 15 gün içinde ödeyin.",
                                                                    "settings": {
                                                                        "currency": "TRY",
                                                                        "locale": "tr-TR"
                                                                    },
                                                                    "translate": {
                                                                        "invoice": "FATURA",
                                                                        "number": "Numara",
                                                                        "date": "Tarih",
                                                                        "due-date": "Son Ödeme Tarihi",
                                                                        "subtotal": "Ara Toplam",
                                                                        "products": "Ürünler",
                                                                        "quantity": "Miktar",
                                                                        "price": "Fiyat",
                                                                        "product-total": "Ürün Toplamı",
                                                                        "total": "Toplam",
                                                                        "vat": "KDV"
                                                                    }
                                                                };

                                                                easyinvoice.createInvoice(data, function (result) {
                                                                    var pdfBuffer = Buffer.from(result.pdf, 'base64');
                                                                    fs.writeFileSync('invoice.pdf', pdfBuffer);
                                                                    console.log('Fatura PDF dosyası kaydedildi: invoice.pdf');
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    });
                });
            });
        });
    });
}

addProduct();
