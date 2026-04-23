import { Pagination } from "react-bootstrap";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";

import SlidePage from "./SlidePage";

export default function SystemPage(props) {

    const [pageNumber, setPageNumber] = useState(1)

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/laughing-fortnight/system_slides.json")
        .then(res => res.json())
        .then(data => {
            setData(data)
        });
    }, []);

    const stuff = useMemo(() => {
        
      })

    return (
        <div>
            {data.length > 0 &&

                <SlidePage {...data[pageNumber]}/>

            }
            <Pagination>
                <Pagination.Prev disabled={pageNumber < data.length-1} onClick={() => {setPageNumber(pageNumber-1)}}></Pagination.Prev>
                {
                            Array.from({ length: data.length }).map((_, i) => (
                            <Pagination.Item key={i} onClick={() => setPageNumber(i)} active={pageNumber === i}>
                                {i+1}
                            </Pagination.Item>
                            ))
                        }
                <Pagination.Next disabled={pageNumber > 0} onClick={() => {setPageNumber(pageNumber+1)}}></Pagination.Next>
            </Pagination>
        </div>
    );
}