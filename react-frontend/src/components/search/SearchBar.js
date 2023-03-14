import React, { useState, useCallback } from 'react';


const SearchBar = ({ history }) => {
    const [keyword, setSearch] = useState('');

    const onChange = useCallback(e => {
        setSearch(e.target.value);
    }, []);

    const onSubmit = useCallback(
        e => {
            const searchKeyword = document.querySelector('#keyword').value;
            console.log(searchKeyword);
            //  history.push(`/search/${keyword}`);
            setSearch("");
        }, []);

    return (
        <div className="header">
            <input id="keyword"
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={onChange}
            />
            <button type="button" className="search" onClick={onSubmit}>
                <span>검색</span>
            </button>
        </div>
    )
};

export default SearchBar;