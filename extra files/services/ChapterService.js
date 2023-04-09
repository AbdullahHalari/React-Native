// import chapters from '../data/chapters.json'
import { useState,useEffect } from "react";

export default class ChapterService {
  

  static getChapters() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log(data);
  
    useEffect(() => {
      fetch('https://raw.githubusercontent.com/AbdullahHalari/Quran_api/master/quranapi2.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    return data.map((chapter) => ({
      id: chapter.id,
      nameAr: chapter.name_ar,
      namePron: chapter.name_pron_en,
      versesNumber: chapter.verses_number,
      class: chapter.class,
      verses: chapter.content.trim().split(/\s*\[[0-9]+\]\s*/).filter(a => a)
    }))
  }

}