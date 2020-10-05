import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './statement.css';

const Statement = (props) => {
  const stmt = props.stmt;
  const entities = props.entities;

    function annotateKeyword() {
        if (stmt == null) return;

        var retValue = [];
        var splitted = stmt.split(' ');
        var cnt = 0;

        for (var i = 0; i < splitted.length; i++) {
            if (entities.entity.includes(splitted[i])) {
                retValue.push(<span className='keyword'> {splitted[i]} </span>);
                cnt++;
            }
            else retValue.push(<span>{splitted[i]}</span>)
        }

        retValue = [(<div> {cnt / splitted.length}</div>)].concat(retValue);

        return retValue
    }

    return (
        <div className='statements'>
            {
                    annotateKeyword()
            }
        </div>
    )
}

export default Statement;
