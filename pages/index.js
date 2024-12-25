import Layout from "@/components/Layout";
import NoteNavLink from "@/components/NoteNavLink";
import { getAPIRequest } from "@/utils/getAPI";
import icons from "@/utils/icons";
import axios from "axios";
import { CalendarDays, CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home({ notes, keywords }) {
  // console.log(notes);
  return (
    <Layout>
      <div
        className="h-full md:w-9/12 mx-auto flex justify-between"
      >
        <div
          className="h-full w-full md:w-8/12 p-2 overflow-y-auto md:border-r"
        >
          {
            notes.map(note => (
              <NoteNavLink
                key={note._id}
                note={note}
              />
            ))
          }
        </div>
        <div
          className="h-full hidden md:block md:w-4/12 overflow-y-auto"
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
    </Layout>
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
