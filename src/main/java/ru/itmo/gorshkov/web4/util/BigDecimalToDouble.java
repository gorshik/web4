package ru.itmo.gorshkov.web4.util;

import java.math.BigDecimal;

public class BigDecimalToDouble {
    public static double convert(BigDecimal decimal) {
        String str = decimal.toString();
        if (str.length() > 10)
            str = str.substring(0, 10);
        return Double.parseDouble(str);
    }
}
