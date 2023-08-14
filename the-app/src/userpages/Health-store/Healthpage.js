import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Healthpage() {
  return (
  <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 mb-6">
            <div className="download-image">
              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMREhMQExMTFRUVFhoWFRgXFhkVGRYdFxoaGRUXGBkYISghGB0mHhkXITEhJikrLi46GCAzODMtNygtLisBCgoKDg0OGxAQGy0mICUtLy0uLy8tLS0tLS8vLS0tLy0tLy0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAGQBkAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYCAwQHAQj/xAA/EAABAwIDBQUFBgQGAwEAAAABAAIDBBEFEiEGEzFBUSJhcYGRFDKhsdEHFSNCwfAzUnJzNFNigrLxkqLDJP/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAtEQACAgIBAgQFBAMBAAAAAAAAAQIRAyESMUEEE2HwUXGBkaEiscHxMtHhUv/aAAwDAQACEQMRAD8A9xREQBERAEREAREQBFz1dUyJhkebNHE/TqVVa/aB7m5xdgdcRN5m3GR3yA4X8Fhm8RDEtlZTUepckXDhFXvomSc7Wd4jQ/XzXctYyUoqS6MsnYREVgEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQGuWQNBcSAACSTwAHEleeY19pDmuLaaJpaPzyX7XeGi1h5+is23UhbRS255QfAuF/p5ryOoi0utscE1bOfNkcXSL7s59ozZpGw1EYjLjZr2kltzwDgdW+Nz5K+vcACToBqSvzjO1eou2hdNgzpQfxABBIb63uGkn+ppB/3KmZKEXInFkbuzjxDFHV9SGNNomk5egaNXyHyBPwXJVVYkeXAWaOywdGjRo+veSuPCX5KWaXm9zYGnoDd8nwaB/uWqBy+czybW+r2/wCPp3+xnJ2X/Ymo7MrCdAQ71uD8gpN+PQB2UOLje3ZBPoefkqdhT/wKn+lg9XhTWx9ADedw4HKzx5n9PVdPh8+TjDFCt3t9lb/1+TSEnSSLWDcX4LJfAVxYrNKyMuhjEj7jslwbpz1K9dG7dHcioNbtxUQvMclM1rhxBJ/ZVg2fxKpnOaanEUZbdrs2pOlhl42tc3VnBpWZxyRk6RPIo/FppmMvBEJX5hdpcG6WNzc+WneqfU7dzxvMb6djXNNiCTcJGDfQmWSMep6Aih8DrKmW5ngEQsC3tXJ63HEeamFDVFk7VhERQSEREARRGO+12Hsu64HNnvm7svLrxVW2Jxeepqnb2VzgInODeDb5mD3RYc1ZRtWUeRKSjR6AiLVHI118pBsbGxvYjiD0KqXNqKubUSVjA6WndEI2MLnXF36XLiLgi1rKN+z/ABGaofUPlkc/KGAA8BmzXIA0HDkrcf02Uc6lxouqIiqXCLgxXEm07MztSdGtHE/Qd64IamrlaHtbExp1APEjr+7LGeeMZcdt/BKyrkk6J5FW4MXqGzNglYy5IGl+B5jWxVkU4s0ct8b1raoRkmEWDXg3AINuPd4rNalgiIgCIiAIiIAiIgCIiAIiIAiIgC1SSWWxy4qkoDVWNbOx8DuEjS3wPI+XHyXj1VCWOfE4WcxxafEGxXpFZUOacw4g3Hko/afAIZpGz73cmVocTlL2ONrG1rEG1vFXhljj3J0jDPDkrR5fVhTODXjw2se+4ZLJCyG/5nMcXPLfBun/AEpj7lo4e090lS7k0DdR/wC7UuPwUFtNWvnIzWa1gtGxgysYOjWjh48Vy+J8dilFwg7v7GUVR3UpvQA34VNj5s0+RWqB6wwR+aiqW/ySQvHnnYfmFjSXcQ0C5JAA6k8AvIzLp8v5aJZaKPs0rz/mSNaPBgLnH1LVb6Z24ihi4HLmd4u1+d/RQVFRB88VMLFlO38Q8i4m8nq6zfJb6irMsrnjhezfAaD6+a7vBYqk5Pt+lfvL8m2OPf6Fiiq7reKhQsF7L7LMQvQNSo/aR/ix/ab83L0hklmtH+kfJeb/AGjf4pv9pvzcpyF+L5W2bFawt7nTxW0lcYnNGVTlpltE68y2rF8TeP8AXF/wYrC92MHlEPDd/qVUcQ33to9otvc8ea1rcG5fd092ynHGn1IzSuPR9T150tjZa6irZG3PI5rG9XEAfFcj5Px3AnRrcx8AFScLqY6+rfNUvaImD8Nj3Bo1PZGp101PXTksoxvZvOfGkurLnSbQU0rsjJmFxNgOFz0F+PkpZea7aUVGGNlpnwh4cA5kb2m4/mAB0I/VWvZfEnz0bZPekaHM1PvOb7tz3i3qplClaKxyNy4v8EjX4vBBpLKxh6E6+g1SgxSGcExSNfbiAdR4g6hVrC9lWPZvaxj5J5HEuGY9nXT3Db925KBfTewYlGyNxylzOPHLJYFp68/QK3CL0nv8EPJJU2tfk9MZLc2XnX2dC1ZL3RP/AObFdo5f/wBBZ3E/AFUjYB1quc9IXn/3Yoh/jIZP84fUtG2tcYqR+WTI8loFnWdYkXtz4XUbsHiUMdKWyTRMcZHGzntabWGtib8lz7X0sE9PJWNa4SBzWXJ0/KOHDgVx4BgdK+lFRMJCS8t7LreGislHhv4lW5ebr4F1r5mS0sz2OD2OifYjUHsuB/VVL7MXhoqnEgAbskk2A/icSp6KeL2WWGHMGxwv0d3g+vNU3Y7C452zulc/dx5CWNNg8nNYnwsfVRGuMiZ3zj9S/RbR0rnbsTxl17DWwPgTofVSpdZea7T7PwsgFTT5mgOyvaSXceBBPl6qybOYiX0MT3G7mkxk9ct7fABVlFVaLRm+XGRo2zvvI+mXTxub/orFRVjZGNeyxFhcDi09CFE1EkVQ3dSHKR7j+ncVCT0s9I7MLt6Obq0+P0K8nJKfhssslXGVX6V7/PUiTcJN9mWuopWvljmzAGO4Itx6a8rLLGKjJC8h2V2Xs62PkojDsZbORHKA150a8cCeQI/fktuMwRysle5pEkIDb306iw81s8kZ4pTw9+vbdful/Za04txNeylTGxj8z2tJdftOAJ046+asMEzXjM1wcOoN1UcGoIXxPklDuy62htyH1UyamOnpnOiBs02bm6n/AL+Cp4Sc44YyklxS63v7EY21H0JKprI49Xua3xOp8BzWqDFYXnK2RpPThfwvxUFglM17XVMwzkusL6jvP76L5jeGRmMzRDKW+80cLHmOis8+Z4/NjFV1rd1+xPKVcki2LnqapkYu9zW+J/TmojZrES+JwebmO2vMtPD0sfgoTaOhbFICy9njNrrqT1TN4txwrLBWn8e3t/ISnUeSLfV18UVs7w2/Dr42C3xSBwDmkEHUEc1WqjAg8XdMd84BxzWtryH78ls2hqdxDHDGbXFrjjlH1+qs8+SClPJGopa3v5fP3vs5tW2tEvUYpCw5XSNB5jjbxtwXRT1DZBmY4OHUG6haOjpGxhjnROJHaJeM1+dje48lF4FPuqrdtdmY4kX5HjlPj9Sqy8TOEo+YlUtae0/5I5tNXRdEWsP5LMFdxqfUREAREQHwrmnZddSxc1AVvEKdaN1vaZ8f5oTmb/TzHz+CnamC6jGNMTw8DuI6jmFTJBTi4voyGrVFMnaoLEodCvQcQwDeEyU5BB1LCbFvcL8lEu2SqJDYtDBzc5wsPIEkrwF4bNCfFxf06e/mc3CS7FQwlmSlq3HQOdDG3vOZzz6BvxCmtnqR0eWXKTNJpTstc9DMRyA1t368ArKNkYwI2mSPLHdwa43Bc615ZAPf4ABlwAANTrfvgYyHNurvkdo+V47R5WaODR0AAGi9KPhpNq9V7/r7+hosbOcQilh9naQZZNZXDl/p/ff1W2gpFupaDW51J4kqWgp7LuhBQiox6I1SpUjS2GwXBWhTEjVyztl3btxu97mFt5e1vJWJZRftG/xTf7Tfm5WHaWQh8dif4Tfm5RGJ7J11RIZZXwlx096wAHAAZVYMEpq5mVlQ6B8IbY83WAs3WwHTjdazpxSvoc8LU22nsg6aZxewXPvDn3qN2sNsTeTyfF/wYrjDDK2E+yiLeGQ33l9G2NrW5+78VWa7ZGtmkdM98Je43JzkcNBazdLABMTSdtk502qSLTOc1TUxDi6AhviWj6qjbG0tPLM6GobcuH4d3Ob2gdW9kjUj5K9YSK2O5qnQuY1hs5vv30tyA68lXMY2V9ocailc0FxzOjccpaeZafH/ALSDStNjInKpJfQkxg8DXZW4eSeFy8kf+RJHmpV7mU0D37uJrIgXlkfJ44C458Nbc1WqbBsTIyPqDEzmTLcgdxGvxClqSGCKN1EMzmSB28lPNzhbN8PgPFRL1dlotvpGiLwivq8Q3jjUbiNlriNva1vYD83LjdRWJ4cIcRhiD3vJfGS55zOJc4XuV2YfsziFNIdxIxrTpnzDKRyJaQfkvuKbK1TpGzxSid2hc8uDS17Ty7hYW8Fomk9NUYtScdp3796LTTxv9se4tdk1AdbQ9kcOqpuwBzVE5HOCT4uYrQKfEG0+UTROmLiXudpkaWgBrbC1wbnhzUDhGzFdTSbyJ8Ga2UguJBBsSCLdw9FSNcWrRpNtyi6ejKqdfC5v7zf/AJrLBWOfhoawFxExuACT8PEeqsGKQMmY+lkLWukjaS5vuiQa/oPJVnDtncSp3FsT2saTqc4LT32IJ+F0jTjVkytT5V2JOko5YYaovaReneW37geNufd3qJ2F/gV39DD6bxWDEMPrDTtgimjeC1zZnvJzOLibgHWwsSPJRWBYBX0rnGN0Fn2Dg5xcDbhyvzPqiri1ZEr5p09DEH3wyb+635sXRsrb2KEHgaix8DcLq2pw2rqLxRmBsBsRclriRxvpwv8AILDZjDKylIje6AwAlztbkacQbDnbimuFWTvzLp9KO9829kmpHNY2w/CsLagX+noVDUWKSQu3TwXMvlcx2vkL8PDgpPE8PdPIJ4HtvYaXs4Ec/Sy2sfWaXgjLhweS2/jo5edDNODlHJFvbppXa+hZSa6kJi9GIqgsj6gtHQngPVT+LkFtWBybHf4n5WXMyj3TzPO4STcWtHAHkT4fu61Ya7M6Zsp0nGp6HW3lr8As/D+HkoZNVy6L4KnX7kRhp+pow5rjRzBgJdnabAXP5eQW6qp5BQ9tpaQ4OseNuGvTisKfB6qJx3TgAfzAix6XB+ikvad00RSO3xcTvTxABFrD4fFRgU5YfJlFrVW+gim48WiOwl5fSyRt1ex2a3Mg9Pis8MnLoKgu4ZLeZBt8x6rFmDysdvaaQOHLWx8CDoV11VJUTNtO+OOO9yBxNv31U4p5YYvKcHySpfB/URbUeNEdgTt3BUynhlDR3k3H6j1WO0rrmA9YmlS9FKwyMhY0CNgJbf8AM7kT8f3Zcdbg1RO7M98VwLAAkADyCzzeHnHwqwxVv06dbIlFqHFGraSpLZWgf5bf1WraPtNp5OTowPMWv81OUbJgC2odE6MNI04/LpdRdHG18Xs0psAbxv8A5T0Pd9V0+Ig/EYHFJp+voXkuUaOiOkgMTZY6feX94Bxu08wQSuygp2+97O2K3ul1ib8rC1woePBaqM/huFjza6wPiu2nw8scJKiUyPbq1gJNjyJ/fqssMnpeTT7ukl8/+V6WVi3/AOTvZKcxB431UhE5RsILnFx5m6kYgvQNTciIgCIiAIiIDFzVokpwV0ogI11FzGiwfQk8ST4klSq+WQEWzDh0W+OjAXciA0shAWwNWSIDW5i55Ka67EQEY6hC+ewBSiICL9gHRfDhw6KVRARP3aOiDDgpZEBFuoL8dV8+7R0UqiAijh+ltbLFuHW4aKXXyyAiPu0dFkMNHRStl9QET93DovvsOltbKVWmoJDXFou4A2HU20QFfr56eA5ZZGNPTifQahcr8WpMrnCVhsCbXsTbkL81ngu7jon1Rj/FyvdI57e054vzPK9rL5s1TNp8P37mtz5Xy3IBPPJqeoDfVaOKRlzbfbpfvZxU2IS1Dc1NTZwCA8ue1tja5aL8bXGvwUviroqZgkkBsXBosMxub/Qqu4Fi81PBTMZELTSkFz9TIS6xyAHgBlGY81Ny47MaxtPuAIwHPIIzSODM1nAA2bct0HeOqmUd9PyVjk1t712JUYcOiykgytJc4hoFzcmwA4qut2qqTJOwU7fw2F1r/wAO2pMjr2Ol9AOOi+4njL5ML3zwGvm7Ay3AILiOBvxaCq+W+5fzY7o30NRLM9jo6f8AAcT+I54BIBIzZePLgpw0IUBgGJzCWnpckW73XaDSXPjDRoZCNASbad6mdpqKSendHERmJbcE2DgD2mkjkUcd0Iy031OMYjTZhGJ2Ek2ADr3J0AFl9xaaOnDcwc5zzlYxou5x7h6eqiK+ZgxGNrYXuZTR+5CzNZzhcGwsANW69y6MJm9sxB8xY9radmRrXgAtc64NwCQD7/oFPBdfSyvN3Xe6JHCXtna5wZIwtcWua9uUgi31XaaAKAxLauW+anbE5gl3TQ65fMfzFgadGjTXvHgpPFMae10kdOxjzC3PM55syMWJy6al1gdOSq4sssiOqSja0FzrAAEk9ANSVC0NTNO5j46b8Bx/iOe0GwJGbLe44cFoxHF5X4Y6aTKHzuyMDRYAE2tbUm4a71WO05miipqGNoAeGRhwfZzi2wcLDgLlpurKPZlZZO6+f36Fhq4WRMdI/RrRcnwUZhjp5ntLqYMhc3M1xe0usRdt2jUX6cly7ZVDxSRQvYGOkkDSxhz9lnQ6XPuad66KLHakzywimbaOMFsYcMwJy5Q55OUaOudNLc7Io/pslz/VXyJsUK0VskVO3PK4MbewNibnjYAa8ioyDaCbd1bZGRsnpwXAC+UttcHjr+twvmL3qfu5jgAZHCV4HDssDnDw1IUKO9+9WS56173RZmQ2W4BfUVDQIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAqu20sskTqaKGV5cWlzg3s2BBsDzN7fFMaEklDuYIZQbsiDXNDXZW2Oa1+GllakVlKq9DNwu99Sl4rRTMqqVsUJeyGGzCdIw/Vt3u5Ws11uJss6KKp+8JpdzoQ1md1wwMGXNk/mJtp8VcUU89VQ8vd33soX3fUNoatxifvqiW5aBd2UuB4Djxd6rbU4ZPM2ip3w5Ymuu8A3sxoaBnP8x7fDhmHNXhE5sjyl8fd2VPZE+zyz0DrXYc8ZsAXsPUjja49T0UrieNNgc1pjkeDe7o25w1w4MNuBKYrgzZnsma90U0ejZG2JsfyuB0cNTp3rbg+FinD+0XukeXvcQBcnoBoAjaeyYqS0iN2YonxtnqpmkSzOLy3i5rRctbbrrw8FH7MMmbHUtfFK2aYvfmLbN93s9o88xPqroijl1JUEq99SibI0UzAxraYRvDvxZpQblua+WNp11GlxpouHLWNpqmEU0maSUukfYkuDiBZgtd3A6jS116Sit5m7or5WqsoFfT1JjoWGncWxvByN1NmBgbvHcGlxzeF+q6cTjqzV0sjoN4WRuNmXEbXuLgA556DIe+yuyKOfoT5fr8PwVWahnlq6UzNDmwtc9zmizM7r2Aub6WZr3LVszFUCoqHvhLRJK4ve+47IvkbGOep48LBW9RGLmsDmeziEtt2t5m4+XJOV6DglvZX9oqF0te2KM2E0IE1uTA+7j5hoCl3OkNcxu4/CZEcsvasM1rgfl5AWtddeE4aYi+SR28mk1e+1gAODGjk0fFSqhy7BQ7+thERVNAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA//2Q==" alt="Health Store" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="message-container">
              <h2>Welcome to Our Health Store</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec risus ut dolor ultrices consequat. Donec id iaculis sem, vel elementum est.
              </p>
              <p>
                At Health Store Online, we provide a wide range of products to support your well-being and health. Browse through our selection of vitamins, pain relief, cold and flu remedies, skin care products, and oral care essentials.
                At Health Store Online, we provide a wide range of products to support your well-being and health. Browse through our selection of vitamins, pain relief, cold and flu remedies, skin care products, and oral care essentials.
                At Health Store Online, we provide a wide range of products to support your well-being and health. Browse through our selection of vitamins, pain relief, cold and flu remedies, skin care products, and oral care essentials.
                At Health Store Online, we provide a wide range of products to support your well-being and health. Browse through our selection of vitamins, pain relief, cold and flu remedies, skin care products, and oral care essentials.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 my-12">
            <div className="card-container">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Vitamins</h3>
                  <Link to="/userpages/Health-store/Vitamins">
                    <button className="btn btn-primary">Click here</button>
                  </Link>
                </div>
              </div>
              <div className="card my-3">
                <div className="card-body">
                  <h3 className="card-title">Pain &amp; Relief</h3>
                  <Link to="/userpages/Health-store/Painrelief">
                    <button className="btn btn-primary">Click here</button>
                  </Link>
                </div>
              </div>
              <div className="card my-3">
                <div className="card-body">
                  <h3 className="card-title">Cold &amp; Flu</h3>
                  <Link to="/userpages/Health-store/coldandflu">
                    <button className="btn btn-primary">Click here</button>
                  </Link>
                </div>
              </div>
              <div className="card my-3">
                <div className="card-body">
                  <h3 className="card-title">Skin Care</h3>
                  <Link to="/userpages/Health-store/skincare">
                    <button className="btn btn-primary">Click here</button>
                  </Link>
                </div>
              </div>
              <div className="card my-3">
                <div className="card-body">
                  <h3 className="card-title">Oral Care</h3>
                  <Link to="/userpages/Health-store/oralcare">
                    <button className="btn btn-primary">Click here</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Healthpage;
