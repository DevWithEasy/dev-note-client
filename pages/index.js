import Header from "@/components/Header";
import { getAPIRequest } from "@/utils/getAPI";
import axios from "axios";
import Link from "next/link";

export default function Home({ notes, keywords }) {
  
  return (
    <div
      className="h-screen"
    >
      <Header />
      <div
        className="h-[calc(100%-48px)] flex justify-between overflow-y-auto"
      >
        <div
          className="h-[calc(100%-48px)] w-9/12 overflow-y-auto border-r"
        >
          {
            notes.map(note => (
              <Link
                key={note._id}
                href={`/note/view/${note._id}`}
              >
                <div>
                  {note.title}
                </div>
              </Link>
            ))
          }
        </div>
        <div
          className="h-[calc(100%-48px)] w-3/12"
        >
          <div
            className="p-2 space-y-3"
          >
            <h2 className="border-b">Note Keywords</h2>
            <div
              className="flex flex-wrap gap-2"
            >
              {
                keywords.map(keyword => (
                  <Link
                    key={keyword}
                    href={`/search/keywords?key=${keyword}`}
                  >
                    <span
                      className="px-2 py-1 bg-gray-100 rounded-full"
                    >
                      {keyword}
                    </span>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  try {
    const { data } = await axios.get(getAPIRequest('/user/index'));
    return {
      props: {
        notes: data.data.notes,
        keywords: data.data.keywords,
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    return { props: { data: [] } }
  }
}
