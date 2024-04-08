import { supabase } from "../../../src/supabase";

const CategoryGetter = async () => {
    const { data: categorias, error } = await supabase.from('categorias_eventos').select('*');
    if (error) {
        console.error('Error fetching categories', error.message);
        return;
    }
    return categorias;
}

export default CategoryGetter;