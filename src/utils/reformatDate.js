export const reformatDate = (date, locale) => {
    const weekDay = new Date(date).toLocaleString(locale, { weekday: "long" });
    const dayMonthYear = new Date(date).toLocaleString(locale, { day: "numeric", month: "long", year: "numeric" });
    const time = new Date(date).toLocaleString(locale, { hour: "numeric", minute: "numeric", hour12: locale == "en" });
    const localeFormat = locale === "id" ? `Pukul ${time}` : String(time);

    return `${weekDay}, ${dayMonthYear} ${localeFormat}`;
};
