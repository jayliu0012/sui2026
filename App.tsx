
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, ChevronRight, PlaneIcon, MapIcon, MenuIcon, SquareCheckIcon, 
  CheckIcon, SquareIcon, LuggageIcon, BatteryIcon, HomeIcon, ClockIcon, LocationIcon,
  TrainIcon, UtensilsIcon, ShoppingBagIcon, TicketIcon, BedIcon,
  FuelIcon, ParkingIcon, CameraIcon, ShrineIcon, MailIcon, HotSpringIcon,
  BusIcon, ShipIcon, CableCarIcon, MusicIcon, ActivityIcon, LifeBuoyIcon, CarIcon,
  InfoIcon, ClothIcon, StarIcon, BookOpenIcon, FileTextIcon, PlusIcon, XIcon
} from './components/Icons';
import { 
  initialPackingList, 
  importantNotes, powerBankRules, flightData, itineraryData, accommodationData, souvenirData
} from './constants';
import { FlightInfo, ItineraryDay, ItineraryStop } from './types';

// =================================================================
// Sub-Components
// =================================================================

const getThemeHex = (colorClass: string) => {
    const match = colorClass.match(/\[(.*?)\]/);
    return match ? match[1] : '#2b6e90';
};

const formatDateForHeader = (dateStr: string) => {
    const d = new Date(dateStr);
    const mmdd = dateStr.split('/').slice(1).join('/');
    const dayOfWeek = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'][d.getDay()];
    return `${mmdd} ${dayOfWeek}`;
};

const NoteWithLink: React.FC<{ text: string; onLinkClick: () => void }> = ({ text, onLinkClick }) => {
    const cleanedText = text.replace(/^備註：\s*/, '');
    const parts = cleanedText.split('⚜️伴手禮');

    if (parts.length < 2) {
        return <span className="w-full whitespace-pre-line">{cleanedText}</span>;
    }

    return (
        <span className="w-full whitespace-pre-line">
            {parts[0]}
            <button
                onClick={onLinkClick}
                className="font-bold text-[#f1be42] hover:underline bg-yellow-50 px-1 py-0.5 rounded-md transition-all duration-200 ease-in-out hover:bg-yellow-100"
            >
                ⚜️伴手禮
            </button>
            {parts[1]}
        </span>
    );
};

const StopItem: React.FC<{ stop: ItineraryStop; index: number; total: number; themeHex: string; onNavigateToSouvenir: () => void; }> = ({ stop, index, total, themeHex, onNavigateToSouvenir }) => {
    return (
        <div className="flex">
            {/* Timeline Column */}
            <div className="flex flex-col items-center w-12 flex-shrink-0 relative mr-2">
                <div className="w-3.5 h-10 rounded-full z-10 flex-shrink-0" style={{ backgroundColor: themeHex }}></div>
                {index !== total - 1 && (
                    <div className="w-1.5 flex-grow -mt-2 opacity-50" style={{ backgroundColor: themeHex }}></div>
                )}
            </div>

            {/* Content Column */}
            <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-3">
                    <div 
                        className="inline-block px-3 py-1 bg-white border-2 rounded-lg shadow-sm"
                        style={{ borderColor: themeHex }}
                    >
                        <span className="text-lg font-bold text-[#3c3c3c]">{stop.time}</span>
                    </div>
                    {stop.category && (
                        <div className="inline-flex items-center justify-center w-10 h-9 bg-white border-2 rounded-lg shadow-sm border-[#EDEDEF]" >
                            {stop.category}
                        </div>
                    )}
                </div>

                <div className="mb-2 text-left">
                    <h4 className="text-xl font-bold text-[#3c3c3c] mb-1 leading-tight">
                        {stop.name}
                    </h4>
                    {stop.durationLabel && (
                        <p className="text-sm text-[#757575] font-medium mb-1">
                            {stop.durationLabel}
                        </p>
                    )}
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap gap-3">
                        {stop.mapUrl && (
                            <a href={stop.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group">
                                <span className="mr-2 text-yellow-500 text-lg">🌐</span>
                                <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">查看地圖</span>
                            </a>
                        )}
                        {stop.parkingUrl && (
                            <a href={stop.parkingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group">
                                <span className="mr-2 text-blue-500 text-lg">🧭</span>
                                <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">停車場導航</span>
                            </a>
                        )}
                        {stop.storageUrl && (
                            <a href={stop.storageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group">
                                <span className="mr-2 text-blue-500 text-lg">🧳</span>
                                <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">行李寄存導航</span>
                            </a>
                        )}
                        {stop.traintimeUrl && (
                            <a href={stop.traintimeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group">
                                <span className="mr-2 text-blue-500 text-lg">🕒</span>
                                <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">時刻表</span>
                            </a>
                        )}
                    </div>
                    {stop.note && (
                        <div className="flex items-start text-left text-base text-[#3c3c3c] leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 w-full">
                            <NoteWithLink text={stop.note} onLinkClick={onNavigateToSouvenir} />
                        </div>
                    )}
                </div>

                {index !== total - 1 && stop.transport && (
                    <div className="relative mt-6 mb-2">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-[#f0f4f6] px-3 text-base text-[#555] font-medium flex items-center">
                                <span className="mr-1 text-lg">{stop.transport.mode}</span> 
                                {stop.transport.time}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// =================================================================
// Page Content Components
// =================================================================

const ItineraryView: React.FC<{ selectedDay: number; setSelectedDay: (d: number) => void; onNavigateToSouvenir: () => void; }> = ({ selectedDay, setSelectedDay, onNavigateToSouvenir }) => {
    const dayData = itineraryData.find(d => d.day === selectedDay) || itineraryData[0];
    const themeHex = getThemeHex(dayData.color);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Horizontal Day Selector Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-[57px] z-40 overflow-x-auto no-scrollbar shadow-sm">
                <div className="flex px-4" ref={scrollRef}>
                    {itineraryData.map((d) => (
                        <button
                            key={d.day}
                            onClick={() => setSelectedDay(d.day)}
                            className={`px-4 py-4 text-base font-bold whitespace-nowrap transition-all relative flex-shrink-0 ${
                                selectedDay === d.day ? 'text-[#333]' : 'text-[#aaa]'
                            }`}
                        >
                            第 {d.day} 天
                            {selectedDay === d.day && (
                                <div className="absolute bottom-0 left-4 right-4 h-1 bg-[#333] rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Itinerary Content */}
            <div className="p-6 max-w-lg mx-auto w-full">
                <h2 className="text-4xl font-bold text-[#5c6c7b] mb-8 text-left">
                    {formatDateForHeader(dayData.date)}
                </h2>
                <div className="mt-4">
                    <h4 className="text-sm font-bold text-[#757575] uppercase tracking-wider mb-8 text-left border-b border-gray-200 pb-2">今日行程路線</h4>
                    {dayData.stops.length > 0 ? (
                        <div>
                            {dayData.stops.map((stop, idx) => (
                                <StopItem 
                                    key={idx} 
                                    stop={stop} 
                                    index={idx} 
                                    total={dayData.stops.length} 
                                    themeHex={themeHex}
                                    onNavigateToSouvenir={onNavigateToSouvenir}
                                />
                            ))}
                            
                            {/* Back to top button at the very end of the list */}
                            <div className="pt-4 pb-12 flex justify-center">
                                <button 
                                    onClick={scrollToTop}
                                    className="flex items-center px-6 py-3 bg-white text-[#2b6e90] font-bold rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition active:scale-95"
                                >
                                    <span className="mr-2">↑</span>
                                    返回頂部
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="py-10 text-center text-gray-400 italic">尚未規劃細節行程</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FlightCard: React.FC<{ flight: FlightInfo }> = ({ flight }) => {
    const { type, date, departure, arrival, flightNumber, airline, color, baggage } = flight;
    
    // Extract color for the top bar
    const barColor = color.replace('text-', 'bg-');

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-6">
            {/* Top Color Bar */}
            <div className={`h-2 w-full ${barColor}`}></div>
            
            <div className="p-6">
                {/* Header */}
                <h3 className="flex items-center text-xl font-bold text-[#3c3c3c] mb-6">
                    <PlaneIcon className={`w-6 h-6 mr-2 ${color}`} />
                    {type}
                </h3>

                {/* Schedule Grid */}
                <div className="mb-2">
                     <p className="text-[#757575] font-bold mb-4">航班時間表</p>
                     
                     <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-8 items-center">

                        <span className="text-[#757575] font-medium">航空公司</span>
                        <span className="text-[#2b6e90] font-bold text-lg text-right">{airline}</span>

                        <span className="text-[#757575] font-medium">航班編號</span>
                        <span className="text-[#2b6e90] font-bold text-lg text-right">{flightNumber}</span>
                        
                        <span className="text-[#757575] font-medium">起飛 ({departure.city}_{departure.terminal})</span>
                        <span className="text-[#2b6e90] font-bold text-xl text-right">{departure.time}</span>
                        
                        <span className="text-[#757575] font-medium">抵達 ({arrival.city}_{arrival.terminal})</span>
                        <span className="text-[#d15b47] font-bold text-xl text-right">{arrival.time}</span>
                     </div>
                </div>

                {/* Date Separator */}
                <div className="border-t border-gray-200 my-4 pt-4 text-center">
                    <p className="text-[#757575] text-md">日期：{date}</p>
                </div>

                {/* Baggage Section */}
                <div className="mt-2">
                     <h4 className="flex items-center text-[#2b6e90] font-bold mb-3 text-md">
                        <LuggageIcon className="w-5 h-5 mr-2" />
                        行李額度
                     </h4>
                     <div className="bg-[#f1be42] bg-opacity-20 border border-[#f1be42] rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[#3c3c3c] text-md font-medium">托運行李:</span>
                            <span className="text-[#2b6e90] font-bold text-right text-md">{baggage.checked}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#3c3c3c] text-md font-medium">手提行李:</span>
                            <span className="text-[#2b6e90] font-bold text-right text-md">{baggage.carryOn}</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

const FlightContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
        
        <div className="bg-[#f1be42] bg-opacity-20 border-l-4 border-[#f1be42] text-[#3c3c3c] p-4 rounded-lg shadow-inner mb-6" role="alert">
            <p className="font-bold text-sm">重要提醒：</p>
            <p className="text-sm">請務必在起飛前至少 2.5 小時抵達機場辦理報到手續。</p>
        </div>

        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            ✈️ 機票與行程
        </h2>
        
        <FlightCard flight={flightData.outbound} />
        <FlightCard flight={flightData.inbound} />
        <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

const AccommodationContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            🏠 住宿資訊
        </h2>

        <div className="space-y-6">
            {accommodationData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#d15b47] hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                        <HomeIcon className="w-5 h-5 mr-2 text-[#d15b47]" />
                        {item.name}
                    </h3>
                    <div className="space-y-2 text-sm text-[#757575]">
                        <div className="flex items-center bg-[#f0f4f6] p-2 rounded text-base text-left">
                            <ClockIcon className="w-4 h-4 mr-2 text-[#757575] flex-shrink-0" />
                            <span className="font-medium">{item.dates}</span>
                        </div>
                        <div className="flex items-start bg-[#f0f4f6] p-2 rounded text-base text-left">
                            <LocationIcon className="w-4 h-4 mr-2 text-[#757575] flex-shrink-0 mt-0.5" />
                            <span className="break-all">{item.address}</span>
                        </div>
                        {item.notes && (
                            <div className="bg-[#f1be42] bg-opacity-10 text-[#3c3c3c] p-3 rounded-md text-base font-mono whitespace-pre-line leading-relaxed border border-[#f1be42] border-opacity-30 mt-2 text-left">
                                <span className="font-normal block mb-1">{item.notes.replace(/^備註：\s*/, '')}</span>
                            </div>
                        )}
                    </div>
                    {/* Map Button */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <a 
                            href={item.mapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#2b6e90] text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition shadow-sm"
                        >
                            <MapIcon className="w-4 h-4 mr-2" />
                            地圖
                        </a>
                    </div>
                </div>
            ))}
        </div>
        <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

const WorshipGuideContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-base"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>

        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            ⛩️ 參拜禮儀指南
        </h2>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-[#d15b47]">
             <h3 className="text-lg font-bold text-[#3c3c3c] mb-2">二禮二拍手一禮</h3>
             <p className="text-[#757575] text-base leading-relaxed">
                這是日本神社最常見的參拜方式（神道教）。<br/>
                前往金刀比羅宮、高屋神社等神社時請參考。
             </p>
        </div>

        {/* Steps Container */}
        <div className="space-y-6">

            {/* Step 1: Torii */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-[#f0f4f6] px-4 py-2 border-b border-gray-100 flex items-center">
                    <span className="bg-[#d15b47] text-white text-xs font-bold px-2 py-1 rounded mr-2">STEP 1</span>
                    <span className="font-bold text-[#3c3c3c]">鳥居 (Torii)</span>
                </div>
                <div className="p-4">
                    <ul className="list-disc list-outside ml-4 space-y-2 text-base text-[#3c3c3c]">
                        <li><span className="font-bold">入內前：</span>在鳥居前輕輕一鞠躬，以示敬意。</li>
                        <li><span className="font-bold">行走時：</span>請走在參道的兩側，中間（正中）是神明的通道。</li>
                    </ul>
                </div>
            </div>

            {/* Step 2: Chozuya */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-[#f0f4f6] px-4 py-2 border-b border-gray-100 flex items-center">
                    <span className="bg-[#2b6e90] text-white text-xs font-bold px-2 py-1 rounded mr-2">STEP 2</span>
                    <span className="font-bold text-[#3c3c3c]">手水舍 (淨身)</span>
                </div>
                <div className="p-4 space-y-3">
                    <div className="flex items-start">
                        <span className="text-lg mr-2">🙇</span>
                        <p className="text-base text-[#3c3c3c]">朝水池微微<span className="font-bold text-[#2b6e90]">鞠躬</span>。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">💧</span>
                        <p className="text-base text-[#3c3c3c]">右手拿勺子盛水，清洗<span className="font-bold text-[#2b6e90]">左手</span>。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">💧</span>
                        <p className="text-base text-[#3c3c3c]">換左手拿勺子，清洗<span className="font-bold text-[#2b6e90]">右手</span>。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">👄</span>
                        <p className="text-base text-[#3c3c3c]">右手拿勺子倒水在<span className="font-bold text-[#2b6e90]">左手掌心</span>，以口接水漱口（請勿直接以口對勺）。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">🤲</span>
                        <p className="text-base text-[#3c3c3c]">再次清洗左手。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">🔄</span>
                        <p className="text-base text-[#3c3c3c]">將勺子立起，用剩餘的水清洗勺柄，放回原處。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">🙇</span>
                        <p className="text-base text-[#3c3c3c]">朝水池微微<span className="font-bold text-[#2b6e90]">鞠躬</span>。</p>
                    </div>
                </div>
            </div>

            {/* Step 3: Worship */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-[#f0f4f6] px-4 py-2 border-b border-gray-100 flex items-center">
                    <span className="bg-[#f1be42] text-white text-xs font-bold px-2 py-1 rounded mr-2">STEP 3</span>
                    <span className="font-bold text-[#3c3c3c]">本殿參拜</span>
                </div>
                <div className="p-4 space-y-4">
                     <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">💰</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-sm">1. 賽錢 (Saisen)</p>
                            <p className="text-base text-[#757575]">輕輕投入香油錢（通常5円象徵結緣）。</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">🔔</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">2. 搖鈴</p>
                            <p className="text-base text-[#757575]">若有鈴鐺，用力搖響以呼喚神明。</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">🙇</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">3. 二禮</p>
                            <p className="text-base text-[#757575]">深深鞠躬兩次。</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">👏</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">4. 二拍手</p>
                            <p className="text-base text-[#757575]">拍手兩次。</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">💭</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">5. 祈願</p>
                            <p className="text-base text-[#757575]">在心裡默念願望。</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">👏</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">6. 一禮</p>
                            <p className="text-base text-[#757575]">最後深深鞠躬一次。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-base"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

const SurvivalGuideContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    const [cathayPolicy, setCathayPolicy] = useState(() => localStorage.getItem('cathay_policy_no') || '');
    const [tokioPolicy, setTokioPolicy] = useState(() => localStorage.getItem('tokio_policy_no') || '');

    useEffect(() => {
        localStorage.setItem('cathay_policy_no', cathayPolicy);
    }, [cathayPolicy]);

    useEffect(() => {
        localStorage.setItem('tokio_policy_no', tokioPolicy);
    }, [tokioPolicy]);

    return (
        <div className="p-4 max-w-lg mx-auto">
            <button
                onClick={() => window.history.back()}
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>

            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
                🆘 生存指南注意事項
            </h2>

            {/* Coupon Bundle Button */}
            <div className="mb-6">
                <a 
                    href="https://www.pac-group.net/index.php?pp=coupon" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-[#d15b47] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition duration-300 active:scale-95"
                >
                    <TicketIcon className="w-6 h-6 mr-2 text-white" />
                    <span className="text-lg">優惠券懶人包</span>
                </a>
                <p className="text-xs text-gray-500 text-center mt-2">
                    點擊前往查看各式藥妝與電器折扣券
                </p>
            </div>

            {/* Postcards */}
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#d15b47] mb-4">
                <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                    📮 明信片 | 郵資
                </h3>
                <ul className="list-disc list-outside ml-4 space-y-2 text-base text-[#757575]">
                    <li><span className="font-bold text-[#3c3c3c]">郵資：</span>¥100 (國際明信片)</li>
                    <li><span className="font-bold text-[#3c3c3c]">郵便局：</span>需要抽號碼牌，櫃台可索取紀念戳章。</li>
                    <li><span className="font-bold text-[#3c3c3c]">郵筒：</span>機場、街道都有，請投左邊【手紙・はがき】專用口。</li>
                </ul>
            </div>

            {/* Tax Free */}
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#f1be42] mb-4">
                <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                    🛍️ TAX-FREE 免稅須知
                </h3>
                <ul className="list-disc list-outside ml-4 space-y-2 text-base text-[#757575] mb-4">
                    <li><span className="font-bold text-[#3c3c3c]">消耗品：</span>會封裝，出境才能拆封。</li>
                    <li><span className="font-bold text-[#3c3c3c]">一般物品：</span>日本境內使用的商品需分開結帳。</li>
                    <li><span className="font-bold text-[#3c3c3c]">百貨公司：</span>分為「店裡辦理」與「免稅櫃台辦理」，請留意退稅時間。</li>
                </ul>
                <div className="flex space-x-2">
                    <span className="bg-[#f1be42] text-white px-2 py-1 rounded font-bold text-sm">税込 (含稅)</span>
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded font-bold text-sm">税抜き (未稅)</span>
                </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#2b6e90] mb-4">
                <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                    📍 Google Map 定位分享
                </h3>
                <div className="bg-gray-100 p-3 rounded-lg text-base text-[#3c3c3c] font-medium">
                    人像圖示 → 位置資訊分享 → 分享位置 → 複製連結
                </div>
            </div>

            {/* Insurance */}
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#98c187] mb-4">
                <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                    🏥 旅遊保險
                </h3>
                <div className="space-y-4">
                    <div>
                        <p className="font-bold text-[#3c3c3c] text-base">全球海外急難救助 (國泰)</p>
                        <p className="text-base text-[#757575] mb-1">電話：+886-2-27551258</p>
                        <div className="mt-1">
                            <label className="text-base font-bold text-[#98c187] uppercase">保險單號</label>
                            <input 
                                type="text" 
                                value={cathayPolicy}
                                onChange={(e) => setCathayPolicy(e.target.value)}
                                placeholder="輸入保險單號..."
                                className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-base font-mono text-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#98c187] transition"
                            />
                        </div>
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                        <p className="font-bold text-[#3c3c3c] text-base">東京海上日動</p>
                        <p className="text-base text-[#757575] mb-1">電話：+81-3-67582444</p>
                        <div className="mt-1">
                            <label className="text-base font-bold text-[#98c187] uppercase">保險單號</label>
                            <input 
                                type="text" 
                                value={tokioPolicy}
                                onChange={(e) => setTokioPolicy(e.target.value)}
                                placeholder="輸入保險單號..."
                                className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-base font-mono text-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#98c187] transition"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Representative Office - Using Osaka data for correctness */}
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#d15b47] mb-4">
                <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                    🆘 駐外代表處 (大阪)
                </h3>
                <ul className="space-y-2 text-base text-[#757575]">
                    <li><span className="font-bold text-[#3c3c3c]">台北駐大阪經濟文化辦事處</span></li>
                    <li className="text-base">大阪市北區中之島3-2-4 中之島フェスティバルタワー・ウエスト 30樓</li>
                    <li><span className="font-bold text-[#3c3c3c]">電話 (境內)：</span>06-6227-8623</li>
                    <li><span className="font-bold text-[#d15b47]">緊急聯絡 (境內)：</span>090-8794-4568</li>
                    <li className="text-sm text-red-500">▲非緊急狀況不能使用</li>
                </ul>
            </div>

            {/* Emergency Numbers */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-red-500 text-center">
                    <p className="text-gray-500 text-base">警察局</p>
                    <p className="text-3xl font-black text-red-500">110</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-red-500 text-center">
                    <p className="text-gray-500 text-base">火警 / 救護車</p>
                    <p className="text-3xl font-black text-red-500">119</p>
                </div>
            </div>

            <button
                onClick={() => window.history.back()}
                className="flex items-center text-[#2b6e90] font-semibold mt-6 mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
        </div>
    );
};

const CollapsibleSection: React.FC<{
  title: React.ReactNode;
  colorClass: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, colorClass, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`bg-white rounded-xl shadow-md border-l-4 ${colorClass} mb-4 overflow-hidden`}>
      <button 
        className="w-full p-5 flex justify-between items-center bg-white hover:bg-gray-50 transition duration-150 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-[#3c3c3c] flex items-center">
          {title}
        </h3>
        <ChevronDown className={`w-5 h-5 text-[#757575] transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
            <div className="border-t border-gray-100 pt-4">
                {children}
            </div>
        </div>
      )}
    </div>
  );
};

const DrivingGuideContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>

        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            🚗 日本自駕注意事項
        </h2>

        <CollapsibleSection title="📋 準備證件" colorClass="border-[#2b6e90]" defaultOpen={true}>
            <ul className="list-disc list-outside ml-5 space-y-2 text-base text-[#757575]">
                <li><span className="font-bold text-[#3c3c3c]">護照</span></li>
                <li><span className="font-bold text-[#3c3c3c]">台灣駕照</span> (正本)</li>
                <li><span className="font-bold text-[#3c3c3c]">駕照日文譯本</span> (正本)</li>
            </ul>
        </CollapsibleSection>

        <CollapsibleSection title="🚙 租車預約資訊" colorClass="border-[#6366f1]">
            <div className="space-y-3 text-base text-[#3c3c3c]">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-bold text-[#757575]">租車公司</span>
                    <span className="font-bold text-[#2b6e90]">平成租車 Heisei Car Rentals</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-bold text-[#757575]">預約號碼</span>
                    <span className="font-mono text-[#d15b47]">20250812-2026-03-29-s1-0201</span>
                </div>
                 <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                    <span className="font-bold text-[#757575]">取車</span>
                    <span>2026-03-29 11:30<br/><span className="text-base text-gray-500">高松車站前店</span></span>
                    
                    <span className="font-bold text-[#757575]">還車</span>
                    <span>2026-04-04 14:30<br/><span className="text-base text-gray-500">高松車站前店</span></span>
                </div>
                <div className="bg-gray-50 p-2 rounded mt-2 space-y-1">
                     <p><span className="font-bold text-[#757575] mr-2">車型:</span>(S1) 小型家庭用車</p>
                     <p><span className="font-bold text-[#757575] mr-2">補償:</span>安心保障</p>
                     <p><span className="font-bold text-[#757575] mr-2">選項:</span>中文導航、ETC卡</p>
                     <p className="border-t border-gray-200 pt-1 mt-1 flex justify-between items-center">
                        <span className="font-bold text-[#757575]">預估費用</span>
                        <span className="font-bold text-lg text-[#d15b47]">¥ 56,430</span>
                     </p>
                </div>
                <p className="text-sm text-[#48404D] mt-2">*ETC費用另計，將於最後一天還車時在店內結算</p>
            </div>
        </CollapsibleSection>
        <CollapsibleSection title="⚠️ 重要行車規則" colorClass="border-red-500" defaultOpen={true}>
             <ul className="space-y-4">
                <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white font-bold text-xs flex items-center justify-center transform" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}>
                        止
                    </div>
                    <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">遇到「止まれ」標誌</p>
                        <p className="text-sm text-[#757575]">一定要在停止線前<span className="text-red-500 font-bold">完全停止</span>後再開。</p>
                    </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-lg">↩️</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">右轉車需禮讓</p>
                        <p className="text-sm text-[#757575]">左轉車優先 → 直行車 → 右轉車。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded text-white flex items-center justify-center text-sm">Bus</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">綠色車道</p>
                        <p className="text-sm text-[#757575]">限制車輛通行（通常為公車/計程車），請避免行駛。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded text-white flex items-center justify-center text-sm">Line</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">黃色實線</p>
                        <p className="text-sm text-[#757575]">禁止變換車道。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">彎</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">左轉小彎、右轉大彎</p>
                        <p className="text-sm text-[#757575]">靠左行駛：左轉轉入近側車道(小彎)，右轉跨越至遠側車道(大彎)。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded text-white flex items-center justify-center text-lg">🛣️</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">開車時記得「抓中線」</p>
                        <p className="text-sm text-[#757575]">右駕容易偏左，駕駛人應刻意靠路中央(中線)行駛，維持車身在車道內。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded text-white flex items-center justify-center text-lg">🚶</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">禮讓行人先行</p>
                        <p className="text-sm text-[#757575]">行人絕對優先。轉彎時若斑馬線有行人，必須完全停止禮讓。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded text-white flex items-center justify-center text-lg">➡</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">依綠色箭頭指示</p>
                        <p className="text-sm text-[#757575]">即使主燈是紅燈，若下方綠色箭頭亮起，該方向車輛可通行。</p>
                     </div>
                </li>
                 <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded text-white flex items-center justify-center text-lg">🖐️</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">雨刷左・方向燈右</p>
                        <p className="text-sm text-[#757575]">操作桿位置與台灣相反：方向燈在右側，雨刷在左側。</p>
                     </div>
                </li>
             </ul>
        </CollapsibleSection>

        <CollapsibleSection title="🚀 速限規定" colorClass="border-[#98c187]">
            <div className="grid grid-cols-1 gap-3">
                 <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="font-medium text-[#3c3c3c]">自動車道 (高速公路)</span>
                    <span className="font-black text-xl text-[#d15b47] bg-white border-2 border-red-500 rounded-full w-12 h-12 flex items-center justify-center">80</span>
                 </div>
                 <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="font-medium text-[#3c3c3c]">一般道路</span>
                    <span className="font-black text-xl text-blue-500 bg-white border-2 border-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-sm">40</span>
                 </div>
                 <div className="flex justify-between items-center bg-gray-50 p-2 rounded border border-purple-200">
                    <span className="font-medium text-purple-700">ETC 收費站</span>
                    <span className="font-bold text-base text-purple-700">減速至 20 km/h 以下</span>
                 </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">*高速公路過路費：ETC扣款，請走【ETC專用】道(紫色)。</p>
        </CollapsibleSection>

        <CollapsibleSection title="⛽ 加油種類" colorClass="border-[#f1be42]">
             <p className="text-sm text-gray-500 mb-2">加油站大多是自助式加油。</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center">
                    <p className="text-xs text-gray-500">一般汽油 (95)</p>
                    <p className="text-lg font-bold text-red-600">Regular</p>
                    <p className="text-xs text-red-400">レギュラー</p>
                    <div className="mt-1 w-full h-2 bg-red-500 rounded-full"></div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-center">
                    <p className="text-xs text-gray-500">特級汽油 (98)</p>
                    <p className="text-lg font-bold text-yellow-600">High Octane</p>
                    <p className="text-xs text-yellow-500">ハイオク</p>
                    <div className="mt-1 w-full h-2 bg-yellow-400 rounded-full"></div>
                </div>
             </div>
        </CollapsibleSection>

        <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#2b6e90] font-semibold mt-6 mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

const LegStretchContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    
    return (
        <div className="p-4 max-w-lg mx-auto">
            <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>

            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
                ⭐ 逛一整天腳底快炸掉？
            </h2>

            {/* Threads Button */}
            <div className="mb-8">
                 <a 
                    href="https://www.threads.net/@mobilitywithnoah/post/DNfAtfPzYWU?xmt=AQF0CLbzE-UAjiE0PF6g_xdyT4DRVU8KazsqlkfY1HnHl_AvgK1hYs6wEadfIfjZPlrRT7Yw&slof=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition duration-300"
                >
                    <StarIcon className="w-5 h-5 mr-2 text-white" />
                    <span>前往 Threads 觀看教學影片</span>
                </a>
                 <p className="text-xs text-gray-500 text-center mt-2">
                    點擊將開啟外部連結
                 </p>
            </div>

            {/* Exercise List */}
            <div className="space-y-4">
                 <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#98c187]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-[#3c3c3c]">1. 足底踩球</h3>
                        <span className="bg-[#98c187] text-white text-xs px-2 py-1 rounded-full">腳趾篇</span>
                    </div>
                    <p className="text-[#757575] text-sm mb-2">放鬆足底筋膜，減緩行走疲勞。</p>
                    <div className="flex items-center text-[#2b6e90] font-bold bg-[#f0f4f6] p-2 rounded-lg">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        30秒 x 3組
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#98c187]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-[#3c3c3c]">2. 腳趾步伐</h3>
                        <span className="bg-[#98c187] text-white text-xs px-2 py-1 rounded-full">腳趾篇</span>
                    </div>
                    <p className="text-[#757575] text-sm mb-2">訓練足弓支撐力，改善走路姿勢。</p>
                    <div className="flex items-center text-[#2b6e90] font-bold bg-[#f0f4f6] p-2 rounded-lg">
                        <span className="text-sm">👣 10次 x 3組</span>
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#f1be42]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-[#3c3c3c]">3. 腿後伸展</h3>
                        <span className="bg-[#f1be42] text-white text-xs px-2 py-1 rounded-full">腿型篇</span>
                    </div>
                    <p className="text-[#757575] text-sm mb-2">弓箭步伸展，拉開緊繃的小腿後側。</p>
                    <div className="flex items-center text-[#2b6e90] font-bold bg-[#f0f4f6] p-2 rounded-lg">
                        <span className="text-sm">🦵 10次 x 3組</span>
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#d15b47]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-[#3c3c3c]">4. 梨狀肌伸展</h3>
                        <span className="bg-[#d15b47] text-white text-xs px-2 py-1 rounded-full">腰痛篇</span>
                    </div>
                    <p className="text-[#757575] text-sm mb-2">躺姿翹腳抱膝，舒緩臀部與下背痠痛。</p>
                    <div className="flex items-center text-[#2b6e90] font-bold bg-[#f0f4f6] p-2 rounded-lg">
                         <ClockIcon className="w-4 h-4 mr-2" />
                        30秒 x 3組
                    </div>
                 </div>
            </div>
            <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
        </div>
    );
};

const ShikokuInfoContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    const [selectedLocId, setSelectedLocId] = useState('064427'); // Default: Kagawa

    const weatherRegions = [
        { id: '064427', name: '香川' },
        { id: '064497', name: '德島' },
        { id: '063941', name: '愛媛' },
        { id: '2240297', name: '高知' }
    ];

    useEffect(() => {
        const scriptId = 'tomorrow-sdk';
        const loadOrUpdateWidget = () => {
            if (!document.getElementById(scriptId)) {
                const fjs = document.getElementsByTagName('script')[0];
                const js = document.createElement('script');
                js.id = scriptId;
                js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
                fjs.parentNode?.insertBefore(js, fjs);
            } else if ((window as any).__TOMORROW__) {
                (window as any).__TOMORROW__.renderWidget();
            }
        };

        loadOrUpdateWidget();
    }, [selectedLocId]);

    const outfitData = [
        {
            region: '香川 (Kagawa)',
            temp: '8°C - 17°C',
            advice: '瀨戶內海氣候溫暖，但早晚溫差大。建議「洋蔥式」穿法：內層發熱衣或短袖，中層長袖針織衫，外層薄大衣或風衣。',
            icon: '🍜'
        },
        {
            region: '德島 (Tokushima)',
            temp: '7°C - 16°C',
            advice: '山區較多，早晚溫差更為顯著。若要看鳴門渦潮，海上風力強勁，建議攜帶防風外套與圍巾。',
            icon: '🌀'
        },
        {
            region: '愛媛 (Ehime)',
            temp: '9°C - 18°C',
            advice: '氣候相對宜人。在道後溫泉散步時，穿著簡單長袖配上休閒外套即可。要注意松山城等高處風大。',
            icon: '🍊'
        },
        {
            region: '高知 (Kochi)',
            temp: '10°C - 19°C',
            advice: '四國最溫暖的地區。白天可能只需長袖襯衫，但面對太平洋水氣重，建議隨身攜帶摺疊傘 or 具防撥水功能的外套。',
            icon: '🐳'
        }
    ];

    return (
        <div className="p-4 max-w-lg mx-auto">
            <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>

            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
                🌍 四國旅遊資訊
            </h2>

            {/* Weather Widget Section */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-[#3c3c3c] mb-4 flex items-center">
                    <InfoIcon className="w-5 h-5 mr-2 text-[#2b6e90]" />
                    各地區天氣預報
                </h3>

                {/* Region Selector Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {weatherRegions.map((region) => (
                        <button
                            key={region.id}
                            onClick={() => setSelectedLocId(region.id)}
                            className={`px-6 py-2 rounded-full font-bold text-base transition-all duration-200 border ${
                                selectedLocId === region.id
                                    ? 'bg-[#2b6e90] text-white border-[#2b6e90] shadow-md'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#2b6e90]'
                            }`}
                        >
                            {region.name}
                        </button>
                    ))}
                </div>
                
                <div key={selectedLocId} className="tomorrow"
                   data-location-id={selectedLocId}
                   data-language="EN"
                   data-unit-system="METRIC"
                   data-skin="light"
                   data-widget-type="upcoming"
                   style={{ paddingBottom: '22px', position: 'relative' }}
                >
                  <a
                    href="https://weather.tomorrow.io/"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    style={{ position: 'absolute', bottom: 0, transform: 'translateX(-50%)', left: '50%' }}
                  >
                    <img
                      alt="Powered by Tomorrow.io"
                      src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
                      width="250"
                      height="18"
                    />
                  </a>
                </div>
            </div>

            {/* Outfit Suggestions Section */}
            <div>
                <h3 className="text-lg font-bold text-[#3c3c3c] mb-4 flex items-center">
                    <ClothIcon className="w-5 h-5 mr-2 text-[#d15b47]" />
                    各地區穿搭建議
                </h3>
                <div className="space-y-4">
                    {outfitData.map((item) => (
                        <div key={item.region} className="bg-white rounded-xl shadow-md p-5 border-l-4 border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-[#3c3c3c] flex items-center">
                                    <span className="text-xl mr-2">{item.icon}</span>
                                    {item.region}
                                </h4>
                                <span className="bg-gray-100 text-[#757575] text-sm font-bold px-2 py-1 rounded">
                                    {item.temp}
                                </span>
                            </div>
                            <p className="text-base text-[#757575] leading-relaxed">
                                {item.advice}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-[#3c3c3c]">
                <p className="font-bold mb-1">💡 穿搭關鍵字：</p>
                <p>#洋蔥式穿法 #防風外套 #薄針織 #方便脫穿 #舒適運動鞋</p>
            </div>

            <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-[#2b6e90] font-semibold mt-6 mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
        </div>
    );
};

const PackingListContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    const [list, setList] = useState(initialPackingList);

    const toggleItem = (catIdx: number, itemIdx: number) => {
        const newList = [...list];
        newList[catIdx].items[itemIdx].packed = !newList[catIdx].items[itemIdx].packed;
        setList(newList);
    };

    const calculateProgress = () => {
        const total = list.reduce((acc, cat) => acc + cat.items.length, 0);
        const packed = list.reduce((acc, cat) => acc + cat.items.filter(i => i.packed).length, 0);
        return total === 0 ? 0 : Math.round((packed / total) * 100);
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>

            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
                🧳 行李檢核表
            </h2>
            
            <CollapsibleSection
                title={
                    <span className="flex items-center">
                        <LuggageIcon className="w-5 h-5 mr-2 text-[#d15b47]" />
                        行李攜帶注意事項
                    </span>
                }
                colorClass="border-[#d15b47]"
            >
                <ul className="space-y-3 text-base">
                    {importantNotes.map((note, index) => {
                        const firstSpace = note.indexOf(' ');
                        const icon = note.substring(0, firstSpace);
                        const rest = note.substring(firstSpace + 1);
                        const colonIndex = rest.indexOf('：');

                        if (colonIndex > -1) {
                            const title = rest.substring(0, colonIndex);
                            const detail = rest.substring(colonIndex + 1).trim();
                            return (
                                <li key={index} className="flex items-start">
                                    <span className="mr-2">{icon}</span>
                                    <div>
                                        <span className="font-bold text-[#3c3c3c]">{title}：</span>
                                        <span className="text-[#757575]">{detail}</span>
                                    </div>
                                </li>
                            );
                        } else {
                            return (
                                <li key={index} className="flex items-start">
                                    <span className="mr-2">{icon}</span>
                                    <span className="text-[#757575]">{rest}</span>
                                </li>
                            );
                        }
                    })}
                </ul>
            </CollapsibleSection>
            
            <CollapsibleSection
                title={
                    <span className="flex items-center">
                        <BatteryIcon className="w-5 h-5 mr-2 text-[#98c187]" />
                        行動電源攜帶詳細規定
                    </span>
                }
                colorClass="border-[#98c187]"
            >
                <ul className="space-y-4 text-base">
                    {powerBankRules.map((rule, index) => (
                        <li key={index}>
                            <p className="font-bold text-[#3c3c3c]">{rule.rule}</p>
                            <p className="mt-1 text-[#757575]">{rule.detail}</p>
                        </li>
                    ))}
                </ul>
            </CollapsibleSection>

            <div className="bg-white p-4 rounded-xl shadow-md mb-6 sticky top-[4.5rem] z-20 border border-gray-100">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-[#757575]">完成度</span>
                    <span className="text-2xl font-black text-[#2b6e90]">{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#2b6e90] h-2.5 rounded-full transition-all duration-500" style={{ width: `${calculateProgress()}%` }}></div>
                </div>
            </div>

            <div className="space-y-6">
                {list.map((category, catIdx) => (
                    <div key={catIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="bg-[#f0f4f6] px-5 py-3 border-b border-gray-100 flex items-center">
                            <span className="text-xl mr-2">{category.icon}</span>
                            <h3 className="font-bold text-[#3c3c3c]">{category.category}</h3>
                        </div>
                        <div className="p-2">
                            {category.items.map((item, itemIdx) => (
                                <div 
                                    key={itemIdx} 
                                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                                    onClick={() => toggleItem(catIdx, itemIdx)}
                                >
                                    <div className={`w-6 h-6 rounded-md border-2 mr-3 flex items-center justify-center transition ${item.packed ? 'bg-[#2b6e90] border-[#2b6e90]' : 'border-gray-300'}`}>
                                        {item.packed && <CheckIcon className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className={`text-base font-medium transition ${item.packed ? 'text-gray-400 line-through' : 'text-[#3c3c3c]'}`}>
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
             <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-[#2b6e90] font-semibold mt-6 mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
        </div>
    );
};

const SouvenirContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            🎁 伴手禮清單
        </h2>
        <div className="space-y-4">
            {souvenirData.map((day) => (
                <CollapsibleSection
                    key={day.day}
                    title={`Day ${day.day} - ${formatDateForHeader(day.date).split(' ')[0]}`}
                    colorClass="border-[#f1be42]"
                    defaultOpen={true}
                >
                    <div className="space-y-6">
                        {day.souvenirs.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                                <img src={item.imageUrl} alt={item.omiyageName} className="w-full h-40 object-cover rounded-md mb-4" />
                                <p className="text-lg font-bold text-[#3c3c3c] mb-3">{item.omiyageName}</p>
                                <a
                                    href={item.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#2b6e90] text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition shadow-sm"
                                >
                                    <MapIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span className="text-left">{item.storeName}</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </CollapsibleSection>
            ))}
        </div>
         <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-[#2b6e90] font-semibold mt-6 mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

interface StickyNote {
  id: string;
  text: string;
  color: string;
  rotation: string;
}

const NotepadContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    const noteColors = ['bg-yellow-100', 'bg-green-100', 'bg-pink-100', 'bg-blue-100', 'bg-purple-100'];
    const noteRotations = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', 'rotate-3'];

    const [notes, setNotes] = useState<StickyNote[]>(() => {
        try {
            const savedNotes = localStorage.getItem('trip_sticky_notes_v2');
            return savedNotes ? JSON.parse(savedNotes) : [];
        } catch (error) {
            console.error("Failed to parse notes from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('trip_sticky_notes_v2', JSON.stringify(notes));
    }, [notes]);
    
    const addNote = () => {
        const newNote: StickyNote = {
            id: `${Date.now()}-${Math.random()}`,
            text: '',
            color: noteColors[notes.length % noteColors.length],
            rotation: noteRotations[notes.length % noteRotations.length],
        };
        setNotes([...notes, newNote]);
    };
    
    const deleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const updateNoteText = (id: string, newText: string) => {
        setNotes(notes.map(note => note.id === id ? { ...note, text: newText } : note));
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
                📝 記事本
            </h2>

            <a 
                href="https://services.digital.go.jp/zh-cmn-hant/visit-japan-web/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl shadow-md p-5 border-l-4 border-[#2b6e90] mb-6 hover:shadow-lg transition duration-300"
            >
                <h3 className="text-lg font-bold text-[#3c3c3c] mb-2 flex items-center">
                    <span className="text-2xl mr-3">🌐</span>
                    Visit Japan Web
                </h3>
                <p className="text-base text-[#757575]">
                    入境審查、海關申報、免稅購物
                </p>
            </a>

            <CollapsibleSection
                title={
                    <span className="flex items-center">
                        <span className="text-2xl mr-3">🛡️</span>
                        東京海上日動保險
                    </span>
                }
                colorClass="border-[#98c187]"
            >
                <div className="space-y-2">
                    <a 
                        href="https://t-o.tokiomarine-nichido.co.jp/IB01/dfw/IB01/ZS3101_WC_PUB/startWC.html?__ZS_gid=COMMON&__ZS_aid=RENAR001&cd=39C25588T9021000000000000OFFICE21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                        <span className="mr-3 text-lg">📄</span>
                        <span className="font-medium text-[#2b6e90]">線上投保</span>
                    </a>
                    <a 
                        href="https://play.google.com/store/apps/details?id=jp.co.tokiomarine_nichido.omotenashi&pcampaignid=web_share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                        <span className="mr-3 text-lg">👽</span>
                        <span className="font-medium text-[#2b6e90]">Android app下載</span>
                    </a>
                    <a 
                        href="https://apps.apple.com/jp/app/tokio-marine-safetyinformation/id1481323309"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                        <span className="mr-3 text-lg">🍎</span>
                        <span className="font-medium text-[#2b6e90]">IOS app下載</span>
                    </a>
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                title={
                    <span className="flex items-center">
                        <BusIcon className="w-6 h-6 mr-3 text-[#6366f1]" />
                        巴士乘車票券
                    </span>
                }
                colorClass="border-[#6366f1]"
            >
                <div className="space-y-2">
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <span className="mr-3 text-lg mt-0.5">🎟️</span>
                        <span className="font-medium text-[#3c3c3c] text-left">Ticket→地域→香川→小豆島橄欖巴士</span>
                    </div>
                    <a 
                        href="https://play.google.com/store/apps/details?id=jp.co.jorudan.nrkj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                        <span className="mr-3 text-lg">👽</span>
                        <span className="font-medium text-[#2b6e90]">Android app下載</span>
                    </a>
                    <a 
                        href="https://apps.apple.com/jp/app/%E4%B9%97%E6%8F%9B%E6%A1%88%E5%86%85/id299490481"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                        <span className="mr-3 text-lg">🍎</span>
                        <span className="font-medium text-[#2b6e90]">IOS app下載</span>
                    </a>
                </div>
            </CollapsibleSection>

             {/* Sticky Note Section */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-bold text-[#3c3c3c] flex items-center">
                        <span className="text-2xl mr-2">📌</span>
                        便利貼牆
                     </h3>
                    <button 
                        onClick={addNote}
                        className="flex items-center bg-white text-[#2b6e90] font-bold py-2 px-4 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 active:scale-95 transition"
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        新增
                    </button>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg min-h-[200px] shadow-inner">
                    <div className="space-y-4">
                        {notes.map(note => (
                            <div key={note.id} className={`relative p-2 w-full h-40 shadow-lg ${note.color} transition-transform`}>
                                <button 
                                    onClick={() => deleteNote(note.id)}
                                    className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-500 z-10"
                                    aria-label="刪除筆記"
                                >
                                    <XIcon className="w-4 h-4" />
                                </button>
                                <textarea 
                                    value={note.text}
                                    onChange={(e) => updateNoteText(note.id, e.target.value)}
                                    className="w-full h-full bg-transparent border-none resize-none focus:outline-none p-2 text-sm text-gray-800 font-medium"
                                    placeholder="記事..."
                                />
                            </div>
                        ))}
                         {notes.length === 0 && (
                            <div className="w-full text-center py-10 text-gray-400 italic">
                                點擊「新增」來貼上第一張便利貼！
                            </div>
                         )}
                    </div>
                </div>
            </div>

            <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-[#2b6e90] font-semibold mt-6 mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
        </div>
    );
};


const MenuButton: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void, fullWidth?: boolean }> = ({ icon, label, onClick, fullWidth }) => (
    <button 
        onClick={onClick}
        className={`bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition duration-200 ${fullWidth ? 'col-span-2' : ''}`}
    >
        {icon}
        <span className="text-[#3c3c3c] font-bold text-[16px]">{label}</span>
    </button>
);

const MenuPage: React.FC<{
    activeSubView: string | null;
    setActiveSubView: (view: string | null) => void;
}> = ({ activeSubView, setActiveSubView }) => {
    // Helper to push state before opening view
    const openSubView = (view: string) => {
        window.history.pushState({ view }, '', `#${view}`);
        setActiveSubView(view);
    };

    // Render subviews based on prop
    if (activeSubView === 'flight') return <FlightContent setSubView={setActiveSubView} />;
    if (activeSubView === 'accommodation') return <AccommodationContent setSubView={setActiveSubView} />;
    if (activeSubView === 'packing') return <PackingListContent setSubView={setActiveSubView} />;
    if (activeSubView === 'worship') return <WorshipGuideContent setSubView={setActiveSubView} />;
    if (activeSubView === 'survival') return <SurvivalGuideContent setSubView={setActiveSubView} />;
    if (activeSubView === 'driving') return <DrivingGuideContent setSubView={setActiveSubView} />;
    if (activeSubView === 'stretch') return <LegStretchContent setSubView={setActiveSubView} />;
    if (activeSubView === 'shikoku_info') return <ShikokuInfoContent setSubView={setActiveSubView} />;
    if (activeSubView === 'souvenir') return <SouvenirContent setSubView={setActiveSubView} />;
    if (activeSubView === 'notepad') return <NotepadContent setSubView={setActiveSubView} />;

    return (
        <div className="p-4 max-w-lg mx-auto grid grid-cols-2 gap-4">
             {/* Menu Buttons */}
             <MenuButton 
                icon={<PlaneIcon className="w-8 h-8 mb-2 text-[#2b6e90]" />} 
                label="機票與行程" 
                onClick={() => openSubView('flight')} 
             />
             <MenuButton 
                icon={<HomeIcon className="w-8 h-8 mb-2 text-[#d15b47]" />} 
                label="住宿資訊" 
                onClick={() => openSubView('accommodation')} 
             />
             <MenuButton 
                icon={<SquareCheckIcon className="w-8 h-8 mb-2 text-[#f1be42]" />} 
                label="行李檢核表" 
                onClick={() => openSubView('packing')} 
             />
             <MenuButton 
                icon={<ShrineIcon className="w-8 h-8 mb-2 text-[#98c187]" />} 
                label="參拜禮儀" 
                onClick={() => openSubView('worship')} 
             />
             <MenuButton 
                icon={<LifeBuoyIcon className="w-8 h-8 mb-2 text-[#d15b47]" />} 
                label="生存指南" 
                onClick={() => openSubView('survival')} 
             />
             <MenuButton 
                icon={<CarIcon className="w-8 h-8 mb-2 text-[#2b6e90]" />} 
                label="自駕注意" 
                onClick={() => openSubView('driving')} 
             />
             <MenuButton 
                icon={<StarIcon className="w-8 h-8 mb-2 text-[#98c187]" />} 
                label="腿部伸展" 
                onClick={() => openSubView('stretch')} 
             />
             <MenuButton 
                icon={<InfoIcon className="w-8 h-8 mb-2 text-[#2b6e90]" />} 
                label="天氣資訊" 
                onClick={() => openSubView('shikoku_info')} 
             />
             <MenuButton 
                icon={<ShoppingBagIcon className="w-8 h-8 mb-2 text-[#f1be42]" />} 
                label="伴手禮" 
                onClick={() => openSubView('souvenir')} 
             />
             <MenuButton 
                icon={<FileTextIcon className="w-8 h-8 mb-2 text-[#6366f1]" />} 
                label="記事本" 
                onClick={() => openSubView('notepad')} 
             />
        </div>
    );
};
const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'itinerary' | 'menu'>('itinerary');
    const [selectedDay, setSelectedDay] = useState(1);
    const [activeSubView, setActiveSubView] = useState<string | null>(null);

    // Handle Hardware Back Button
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (activeSubView) {
                setActiveSubView(null);
            } else if (currentPage === 'menu') {
                setCurrentPage('itinerary');
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [activeSubView, currentPage]);

    const handleNavigateToSouvenir = () => {
        window.history.pushState(null, '', '#souvenir');
        setCurrentPage('menu');
        setActiveSubView('souvenir');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleSwitchToMenu = () => {
        if (currentPage !== 'menu') {
            window.history.pushState(null, '', '#menu');
            setCurrentPage('menu');
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f4f6] pb-24 font-sans">
            <header className="bg-white border-b border-gray-200 shadow-sm p-4 sticky top-0 z-50">
                <div className="max-w-lg mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-extrabold text-[#2b6e90]">2026 四國自駕遊</h1>
                        <p className="text-[10px] text-[#757575]">Google AI Studio協同規劃儀表板 v2.0</p>
                    </div>
                </div>
            </header>

            {currentPage === 'itinerary' ? (
                <ItineraryView 
                    selectedDay={selectedDay} 
                    setSelectedDay={setSelectedDay}
                    onNavigateToSouvenir={handleNavigateToSouvenir}
                />
            ) : (
                <MenuPage 
                    activeSubView={activeSubView}
                    setActiveSubView={setActiveSubView}
                />
            )}

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around z-50 pb-safe">
                <button 
                    className={`flex flex-col items-center justify-center py-3 w-1/2 transition ${currentPage === 'itinerary' ? 'text-[#2b6e90] font-bold' : 'text-[#757575]'}`}
                    onClick={() => setCurrentPage('itinerary')}
                >
                    <BookOpenIcon className="w-6 h-6 mb-1" /><span className="text-[14px]">行程總覽</span>
                </button>
                <button 
                    className={`flex flex-col items-center justify-center py-3 w-1/2 transition ${currentPage === 'menu' ? 'text-[#2b6e90] font-bold' : 'text-[#757575]'}`}
                    onClick={handleSwitchToMenu}
                >
                    <MenuIcon className="w-6 h-6 mb-1" /><span className="text-[14px]">選單</span>
                </button>
            </footer>
        </div>
    );
};

export default App;
