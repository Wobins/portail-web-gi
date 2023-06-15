export default function searchArray (query, tab) {
    let newTab = tab.filter(el => (
        query.toLowerCase() === "" ? el : (el.label + el.code + el.added_at + el.school_year).toLowerCase().includes(query)
    ));
    return newTab;  
}