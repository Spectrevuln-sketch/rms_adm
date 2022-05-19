import React, { useState } from 'react'
import { useAsyncDebounce } from "react-table";
import styled from "styled-components";
// style
const SearchStyle = styled.div`
float : right;
margin-right: 5vw;
`;


const SearchFilterTables = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 300);
    return (
        <>
            <SearchStyle>
                <div id="example1_filter" className="dataTables_filter">
                    <label>
                        Search:
                        <input
                            type="search"
                            className="form-control form-control-sm"
                            placeholder
                            aria-controls="example1"
                            value={value || ""}
                            onChange={(e) => {
                                setValue(e.target.value);
                                onChange(e.target.value);
                            }}
                            placeholder={`${count} records...`}
                        />
                    </label>
                </div>
            </SearchStyle>
        </>
    )
}

export default SearchFilterTables
