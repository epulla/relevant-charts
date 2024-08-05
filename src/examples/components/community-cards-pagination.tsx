"use client";

import ExampleCard from "./example-card";
import { useEffect, useState } from "react";
import { Example } from "../types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CardsGridSkeleton from "./cards-grid-skeleton";
export default function CommunityCardsPagination() {
  const [page, setPage] = useState(1);
  const [totalExamples, setTotalExamples] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [examples, setExamples] = useState<Example[]>([]);

  useEffect(() => {
    fetch(`/api/examples/count`, {
      next: {
        revalidate: 60,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalExamples(data.total);
      });
    fetch(`/api/examples?page=${page}`, {
      next: {
        revalidate: 60,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExamples(data.data);
        setIsLoading(false);
      });
  }, [page]);
  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-0.5">
        {!isLoading ? (
          <>
            {examples.map((example) => (
              <ExampleCard
                key={example.id}
                example={example}
                href={`/examples/community/${example.id}`}
              />
            ))}
          </>
        ) : (
          <CardsGridSkeleton />
        )}
      </div>
      <Pagination className="mt-2">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                role="button"
                onClick={() => setPage(page - 1)}
              />
            </PaginationItem>
          )}
          {page - 1 > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink role="button" onClick={() => setPage(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink role="button" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          {page < totalExamples && (
            <PaginationItem>
              <PaginationLink role="button" onClick={() => setPage(page + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {page + 1 < totalExamples && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {page < totalExamples && (
            <PaginationItem>
              <PaginationNext role="button" onClick={() => setPage(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
