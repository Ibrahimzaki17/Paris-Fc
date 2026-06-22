import './Trophies.css';

function Trophies() {

    return(
        <div className='trophy-section'>
            <title>Trophies</title>
            <div className='trophy-title'>
                <h2>PARIS FC TROPHIES</h2>
            </div>
            <div className='achievements'>
               <h2>Our Achievements</h2>
               <p>Paris Fc has proudly won ...</p>
            </div>
            <div className='league-titles-section'>
                <span><h2>LEAGUE TITLES</h2></span>
                <div className='trophy-card'>
                    <img src="images/LeagueTitle.jpg" />
                    <div className='details'>
                      <h2>Regional League Champions</h2>
                      <p>2022/2023, 2023/2024, 2024/2025</p>
                    </div>
                </div>
                <div className='trophy-card'>
                    <img src="images/LeagueTitle.jpg" />
                    <div className='details'>
                      <h2>Regional League Champions</h2>
                      <p>2022/2023, 2023/2024, 2024/2025</p>
                    </div>
                </div>
            </div>

            <div className='cup-titles-section'>
                <span><h2>CUP COMPETITIONS</h2></span>
                <div className='trophy-card'>
                    <img src="images/cupTitle.jpg" />
                    <div className='details'>
                      <h2>County Cup </h2>
                      <p>2022/2023, 2023/2024, 2024/2025</p>
                    </div>
                </div>
                <div className='trophy-card'>
                    <img src="images/cupTitle.jpg" />
                    <div className='details'>
                      <h2>County Cup </h2>
                      <p>2022/2023, 2023/2024, 2024/2025</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Trophies