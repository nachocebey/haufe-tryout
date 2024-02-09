import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../utils/apiService";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";

import "./List.scss";
import Spinner from "../../components/Spinner/Spinner";

function List() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const user = useSelector((state) => state.user);

  const headers = {
    UserId: user.id,
  };

  const characters = useQuery({
    queryKey: ["characters", page],
    queryFn: () =>
      apiService(
        "GET",
        `characters${page ? `/?page=${page}` : ``}`,
        null,
        headers
      ).then((res) => res.data),
  });

  const favorites = useQuery({
    queryKey: ["favorites"],
    queryFn: () =>
      apiService("GET", `users/${user.id}/favorites`).then((res) => res.data),
    cacheTime: 0,
    staleTime: 0,
  });

  if (characters.isPending || favorites.isPending) return <Spinner />;

  if (characters.error || favorites.error) {
    throw new Response("Not Found", { status: 404 });
  }

  return (
    <>
      <div className="list">
        {characters.data?.data.map((item, index) => (
          <Card
            key={index}
            {...item}
            isFavorite={favorites.data?.data.includes(item.id.toString())}
          />
        ))}
      </div>
      <div className="pagination__container">
        <Pagination
          currentPage={Number(page)}
          totalPages={characters.data.totalPages}
        />
      </div>
    </>
  );
}

export default List;
