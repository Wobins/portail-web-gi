export default function searchArray (query, tab) {
    let newTab = tab.filter(function (el) {
        const x = new Date(el.added_at).toLocaleDateString('en-GB')
        return query.toLowerCase() === "" ? el : (el.label + el.code + x + el.added_at + el.school_year).toLowerCase().includes(query)
    });
    return newTab;  
}