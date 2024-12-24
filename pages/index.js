import Header from "@/components/Header";
import { getAPIRequest } from "@/utils/getAPI";
import icons from "@/utils/icons";
import axios from "axios";
import { CalendarDays, CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home({ notes, keywords }) {
  // console.log(notes);
  return (
    <div
      className="h-screen"
    >
      <Header />
      <div
        className="h-[calc(100%-48px)] md:w-9/12 mx-auto flex justify-between overflow-y-auto"
      >
        <div
          className="h-full w-8/12 p-2 overflow-y-auto border-r"
        >
          {
            notes.map(note => (
              <Link
                key={note._id}
                href={`/note/view/${note._id}`}
              >
                <div
                  className="p-1 mb-2 flex space-x-2 border rounded"
                >
                  <div>
                    <Image
                      src={icons[note.icon]}
                      alt={note.icon}
                      height={25}
                      width={30}
                    />
                  </div>
                  <div
                    className="w-full space-y-1"
                  >
                    <h3 className="font-medium">{note.title}</h3>
                    <div
                    className="flex space-x-2 pb-1 text-gray-400"
                    >
                      <div
                        className="flex items-center space-x-1"
                      >
                        <CircleUserRound size={16}/>
                        <span
                          className="text-xs"
                        >
                          {note?.user?.name}
                        </span>
                      </div>
                      <div
                        className="flex items-center space-x-1"
                      >
                        <CalendarDays size={14}/>
                                              <span
                        className="text-xs"
                      >
                        {new Date(note?.createdAt).toDateString()}
                      </span>
                      </div>
                    </div>
                    <div
                      className="flex flex-wrap space-x-1"
                    >
                      {
                        note.keywords.map(key => (
                          <span
                            key={key}
                            className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full"
                          >
                            {key}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
        <div
          className="h-full w-4/12 overflow-y-auto"
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
