import React from 'react';

// see [[https://github.com/patricktran/react-table-hoc-draggable-columns/blob/master/src/index.js][here]].

export default class EntryTable extends React.Component {
  render() {
    return (
      // <div className="message">
      //   <h3>No torrents to display</h3>
      //   <button>Clear Filters</button>
      //   </div>
      <div id="content">
        <table id="torrents">
          <colgroup>
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
            <col span={1} style={{width: '8em'}} />
          </colgroup>

          <thead>
            <tr>
              <th className="active ascending" title="Name">Name</th>
              <th title="Progress">Progress</th>
              <th title="Downloaded">Downloaded</th>
              <th title="Download Speed">Download Speed</th>
              <th title="Uploaded">Uploaded</th>
              <th title="Upload Speed">Upload Speed</th>
              <th title="ETA">ETA</th>
              <th title="Ratio">Ratio</th>
              <th title="File Size">File Size</th>
              <th title="Peers">Peers</th>
              <th title="Seeds">Seeds</th>
              <th title="Added">Added</th>
              <th title="Tags">Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chivalry of a Failed Knight</td>
              <td>icon - ==========</td>
              <td>28.4MB</td>
              <td>0B/s</td>
              <td>0B</td>
              <td>0B/S</td>
              <td>-</td>
              <td>0</td>
              <td>87.1MB</td>
              <td>0 of 1</td>
              <td>0 of 10</td>
              <td>7/20/2020</td>
              <td>a,b,c,d,e,f,g,h</td>
            </tr>
            <tr>
              <td>Chivalry of a Failed Knight</td>
              <td>icon - ==========</td>
              <td>28.4MB</td>
              <td>0B/s</td>
              <td>0B</td>
              <td>0B/S</td>
              <td>-</td>
              <td>0</td>
              <td>87.1MB</td>
              <td>0 of 1</td>
              <td>0 of 10</td>
              <td>7/20/2020</td>
              <td>a,b,c,d,e,f,g,h</td>
            </tr>
            <tr>
              <td>Chivalry of a Failed Knight</td>
              <td>icon - ==========</td>
              <td>28.4MB</td>
              <td>0B/s</td>
              <td>0B</td>
              <td>0B/S</td>
              <td>-</td>
              <td>0</td>
              <td>87.1MB</td>
              <td>0 of 1</td>
              <td>0 of 10</td>
              <td>7/20/2020</td>
              <td>a,b,c,d,e,f,g,h</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
