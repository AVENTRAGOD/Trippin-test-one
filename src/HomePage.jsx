import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Waves, Binoculars, Fish, Mountain, Coffee, Anchor, 
  Menu, X, ChevronDown
} from 'lucide-react';

const provincesData = [
  {
    id: "WP",
    name: "Western",
    description: "Colombo, Negombo, Kelaniya. Most urbanized province, home to the commercial capital Colombo and the stunning Negombo lagoon.",
    knownFor: ["City Life","Negombo Beach","Kelaniya Temple"],
    paths: ["M98.0,521.9 L93.7,527.7 L92.1,532.3 L96.5,537.0 L92.5,540.5 L87.3,539.3 L81.5,541.7 L82.6,546.9 L79.1,546.0 L76.8,540.6 L74.7,539.9 L69.7,543.9 L65.8,543.2 L58.9,549.0 L49.6,552.3 L41.3,547.2 L41.1,550.2 L42.8,555.8 L42.4,558.6 L35.8,541.5 L33.2,526.7 L33.4,513.3 L43.4,517.1 L46.4,515.7 L55.3,518.3 L61.4,517.4 L66.0,520.9 L70.1,522.8 L77.1,523.0 L78.0,516.1 L80.9,513.3 L84.4,511.7 L89.3,512.2 L92.5,511.1 L96.4,511.3 L99.5,512.9 L100.0,516.2 L97.7,518.4 Z","M95.1,461.0 L93.6,464.8 L93.1,470.9 L88.0,474.6 L87.2,479.6 L89.4,484.1 L93.8,483.1 L97.5,484.2 L96.2,487.2 L93.6,489.0 L91.3,494.2 L90.4,499.5 L93.0,508.0 L92.5,511.1 L89.3,512.2 L84.4,511.7 L80.9,513.3 L78.0,516.1 L77.1,523.0 L70.1,522.8 L66.0,520.9 L61.4,517.4 L55.3,518.3 L46.4,515.7 L43.4,517.1 L33.4,513.3 L35.2,509.0 L35.6,504.9 L27.1,474.6 L28.2,472.9 L30.7,477.5 L32.4,483.5 L34.3,485.0 L35.7,482.5 L35.7,477.0 L34.4,472.6 L31.2,471.5 L29.4,469.3 L30.7,465.3 L29.7,457.5 L33.9,457.7 L40.7,456.4 L44.2,458.2 L46.8,456.6 L50.0,457.8 L53.8,456.4 L60.6,451.0 L64.9,450.9 L69.8,454.4 L75.0,452.8 L79.4,449.7 L84.4,448.9 L87.5,453.7 L92.0,458.7 Z","M92.5,540.5 L93.1,544.2 L96.2,552.4 L95.9,555.3 L98.8,562.2 L104.3,567.5 L105.3,572.7 L109.8,575.6 L113.8,579.2 L116.4,584.1 L113.7,585.2 L114.6,588.2 L122.2,598.8 L128.7,610.0 L122.3,611.5 L112.7,616.8 L112.7,620.6 L114.0,624.5 L113.7,628.1 L102.8,619.1 L97.4,619.6 L92.5,622.3 L84.7,620.9 L78.9,616.3 L72.0,614.1 L65.5,611.1 L63.2,608.3 L60.3,609.8 L57.0,607.2 L54.0,600.6 L56.3,600.5 L54.8,590.3 L42.4,558.6 L42.8,555.8 L41.1,550.2 L41.3,547.2 L49.6,552.3 L58.9,549.0 L65.8,543.2 L69.7,543.9 L74.7,539.9 L76.8,540.6 L79.1,546.0 L82.6,546.9 L81.5,541.7 L87.3,539.3 Z"]
  },
  {
    id: "CP",
    name: "Central",
    description: "Kandy, Nuwara Eliya, Ella. The heart of Sri Lanka featuring the sacred Temple of the Tooth and breathtaking tea country highlands.",
    knownFor: ["Tea Plantations","Kandy Temple","Scenic Trains"],
    paths: ["M161.7,425.2 L165.4,430.2 L176.7,437.3 L183.3,437.7 L187.1,433.5 L186.5,426.9 L187.6,424.1 L190.1,422.6 L192.7,423.6 L199.4,429.1 L204.5,428.3 L210.2,423.7 L217.6,423.7 L220.5,422.3 L222.7,425.0 L227.1,420.0 L230.7,419.4 L236.4,420.0 L238.0,447.1 L241.9,460.0 L241.6,465.9 L236.8,470.3 L230.7,472.8 L223.3,471.3 L215.6,472.4 L209.0,471.9 L204.9,465.4 L201.5,464.6 L195.8,458.4 L198.0,470.3 L194.4,476.4 L182.9,490.0 L176.3,489.3 L171.1,492.8 L167.5,493.6 L161.0,492.8 L156.9,496.0 L159.8,496.2 L163.0,502.0 L167.7,507.4 L165.6,513.4 L161.7,517.5 L156.5,514.4 L148.5,502.5 L143.4,502.1 L144.8,495.7 L140.7,487.0 L142.8,485.2 L149.0,484.2 L151.8,481.1 L155.7,480.6 L158.1,476.0 L153.5,470.8 L153.9,465.0 L151.7,462.4 L145.6,458.8 L145.9,455.4 L138.2,448.6 L136.0,443.1 L142.9,442.6 L144.4,435.0 L147.0,435.0 L149.8,436.9 L152.8,437.2 L152.8,433.3 L155.4,431.9 L159.9,431.4 L157.4,426.7 Z","M236.4,420.0 L230.7,419.4 L227.1,420.0 L222.7,425.0 L220.5,422.3 L217.6,423.7 L210.2,423.7 L204.5,428.3 L199.4,429.1 L192.7,423.6 L190.1,422.6 L187.6,424.1 L186.5,426.9 L187.1,433.5 L183.3,437.7 L176.7,437.3 L165.4,430.2 L161.7,425.2 L163.1,419.8 L158.9,410.3 L159.3,406.5 L162.5,402.6 L163.0,396.8 L159.8,393.6 L158.3,382.1 L156.7,377.2 L152.4,368.4 L149.5,367.2 L149.8,361.1 L153.6,358.3 L159.6,356.1 L162.8,352.3 L167.8,353.8 L174.2,348.3 L173.7,346.2 L177.7,341.2 L178.7,335.0 L181.8,335.4 L188.6,329.0 L195.8,325.8 L199.8,330.1 L199.8,333.2 L202.2,334.8 L205.6,331.9 L213.1,334.6 L207.8,340.2 L205.5,352.8 L202.9,362.6 L197.7,363.8 L196.5,368.7 L198.9,379.6 L198.6,383.1 L200.3,385.6 L205.0,386.6 L209.5,384.8 L213.1,381.5 L217.4,385.4 L218.5,379.0 L228.1,379.7 L237.4,378.0 L237.3,381.0 L238.9,388.5 L237.2,396.9 L235.5,405.4 Z","M143.4,502.1 L148.5,502.5 L156.5,514.4 L161.7,517.5 L165.6,513.4 L167.7,507.4 L163.0,502.0 L159.8,496.2 L156.9,496.0 L161.0,492.8 L167.5,493.6 L171.1,492.8 L176.3,489.3 L182.9,490.0 L194.4,476.4 L198.0,470.3 L195.8,458.4 L201.5,464.6 L204.9,465.4 L209.0,471.9 L215.6,472.4 L223.3,471.3 L230.7,472.8 L230.5,476.0 L231.9,483.6 L233.3,485.5 L231.2,488.7 L232.5,493.1 L229.3,497.2 L226.8,503.9 L222.8,509.7 L216.1,511.2 L210.0,515.3 L209.1,518.9 L206.7,521.6 L200.1,521.6 L200.3,524.5 L206.1,527.3 L209.9,534.9 L207.2,539.1 L210.5,541.0 L208.7,543.6 L205.3,544.4 L195.2,549.7 L189.6,550.5 L183.6,550.3 L175.4,551.2 L165.6,549.9 L156.3,547.8 L151.9,547.5 L148.2,544.7 L150.3,541.6 L149.2,537.3 L151.2,535.5 L149.6,528.4 L145.4,525.3 L140.2,523.7 L138.7,518.5 L139.9,511.8 L137.8,509.3 L142.6,505.3 Z"]
  },
  {
    id: "SP",
    name: "Southern",
    description: "Galle, Mirissa, Weligama. A coastline famous for colonial Dutch forts, whale watching and world-class surf breaks.",
    knownFor: ["Galle Fort","Whale Watching","Surfing"],
    paths: ["M128.7,610.0 L133.3,614.3 L139.0,615.6 L144.6,618.3 L147.5,618.3 L149.0,620.5 L145.3,621.6 L142.9,624.0 L147.7,630.0 L146.7,635.0 L141.2,633.8 L133.9,627.7 L128.1,627.6 L129.9,630.9 L133.4,633.2 L137.2,638.6 L138.5,643.7 L135.4,647.5 L129.1,646.4 L131.8,651.6 L128.9,658.7 L130.1,662.2 L138.8,669.5 L133.6,675.3 L131.1,676.3 L130.6,679.9 L135.1,681.9 L134.0,684.1 L130.8,685.3 L128.8,688.8 L129.2,692.8 L124.4,690.2 L121.3,691.5 L118.8,688.9 L109.9,685.8 L104.5,684.6 L98.0,680.3 L96.7,681.6 L93.3,678.9 L78.8,663.5 L74.2,655.9 L65.9,638.5 L65.7,633.9 L63.9,629.9 L62.4,621.5 L59.1,615.6 L57.0,607.2 L60.3,609.8 L63.2,608.3 L65.5,611.1 L72.0,614.1 L78.9,616.3 L84.7,620.9 L92.5,622.3 L97.4,619.6 L102.8,619.1 L113.7,628.1 L114.0,624.5 L112.7,620.6 L112.7,616.8 L122.3,611.5 Z","M367.1,594.7 L361.6,603.4 L356.0,609.0 L345.6,616.4 L337.7,619.8 L304.4,645.9 L297.8,649.5 L276.2,657.1 L275.8,654.4 L273.1,653.8 L272.1,658.2 L259.7,664.8 L241.0,668.8 L232.0,671.9 L222.0,673.7 L217.5,675.4 L214.8,679.2 L209.9,678.2 L205.3,680.0 L191.0,690.7 L185.4,688.1 L183.3,684.8 L184.7,682.6 L178.9,680.0 L178.5,677.1 L184.3,674.7 L182.4,667.8 L184.6,664.7 L180.6,664.6 L177.6,663.1 L177.0,660.0 L178.9,656.5 L173.0,654.6 L169.9,652.4 L172.1,644.7 L178.9,639.5 L177.7,636.7 L180.3,631.5 L190.6,633.5 L203.7,638.2 L207.2,638.7 L214.0,637.6 L218.8,642.2 L229.2,644.7 L230.1,641.6 L228.4,637.0 L225.1,633.3 L234.0,628.0 L239.1,626.4 L243.0,623.5 L241.3,619.4 L242.1,615.4 L246.8,615.2 L248.3,610.8 L250.5,612.3 L252.2,610.4 L261.1,610.9 L264.2,612.0 L265.6,615.3 L269.3,615.4 L273.1,614.0 L279.2,623.0 L283.7,624.9 L290.4,620.4 L298.4,617.9 L309.0,613.8 L317.8,611.4 L322.8,612.5 L325.1,608.7 L325.0,605.7 L326.6,603.3 L325.6,597.9 L329.1,595.0 L333.4,593.1 L340.4,587.1 L345.2,586.2 L348.4,582.5 L353.8,589.1 L358.1,589.5 L361.1,592.9 Z","M180.3,631.5 L177.7,636.7 L178.9,639.5 L172.1,644.7 L169.9,652.4 L173.0,654.6 L178.9,656.5 L177.0,660.0 L177.6,663.1 L180.6,664.6 L184.6,664.7 L182.4,667.8 L184.3,674.7 L178.5,677.1 L178.9,680.0 L184.7,682.6 L183.3,684.8 L185.4,688.1 L191.0,690.7 L188.3,693.9 L177.8,693.9 L173.0,696.2 L168.6,699.4 L166.1,700.0 L156.9,696.3 L146.5,697.5 L143.6,697.0 L139.8,691.5 L136.7,693.3 L129.2,692.8 L128.8,688.8 L130.8,685.3 L134.0,684.1 L135.1,681.9 L130.6,679.9 L131.1,676.3 L133.6,675.3 L138.8,669.5 L130.1,662.2 L128.9,658.7 L131.8,651.6 L129.1,646.4 L135.4,647.5 L138.5,643.7 L137.2,638.6 L133.4,633.2 L129.9,630.9 L128.1,627.6 L133.9,627.7 L141.2,633.8 L146.7,635.0 L147.7,630.0 L142.9,624.0 L145.3,621.6 L149.0,620.5 L156.0,619.2 L157.3,616.3 L168.2,615.2 L170.8,620.0 L169.6,623.1 L177.1,623.0 L179.0,627.1 L181.3,628.8 Z"]
  },
  {
    id: "NP",
    name: "Northern",
    description: "Jaffna, Mannar, Kilinochchi. A culturally rich region with unique Tamil heritage, ancient Hindu temples and stunning lagoon landscapes.",
    knownFor: ["Jaffna Fort","Hindu Temples","Lagoons"],
    paths: ["M40.1,138.9 L46.2,144.8 L38.1,141.6 L35.1,141.1 L43.4,150.5 L45.0,153.4 L40.7,152.8 L36.0,148.3 L32.7,146.3 L25.4,139.7 L18.1,136.5 L8.2,134.1 L7.9,130.7 L10.2,129.9 L18.1,129.9 L25.3,131.8 L32.9,134.7 Z M121.6,156.0 L126.5,158.3 L129.2,162.7 L131.9,169.6 L131.0,175.9 L121.4,179.4 L111.4,180.6 L104.9,179.9 L99.9,182.6 L97.3,188.6 L92.7,189.1 L92.0,194.1 L96.2,197.3 L102.9,206.0 L85.6,210.5 L76.8,210.4 L68.9,207.2 L70.3,217.7 L69.9,234.3 L66.7,233.4 L57.4,228.8 L52.1,228.3 L45.3,225.3 L50.5,212.7 L52.1,195.2 L47.9,184.1 L48.6,169.3 L47.6,163.0 L46.0,159.6 L51.6,157.8 L62.0,148.5 L69.6,143.9 L73.0,135.1 L74.2,128.8 L79.9,114.1 L80.7,111.1 L88.1,110.6 L95.3,106.2 L95.5,112.3 L96.6,118.1 L99.8,123.3 L100.4,125.9 L99.6,131.3 L99.7,139.1 L95.8,140.5 L92.8,148.3 L94.5,151.1 L92.2,157.6 Z","M10.5,61.5 L6.0,61.8 L1.8,60.4 L0.0,58.1 L0.0,50.8 L1.7,49.1 L3.7,52.6 L11.3,54.5 L13.3,58.8 Z M30.5,41.1 L34.0,41.5 L33.0,38.7 L36.3,40.0 L36.5,46.2 L34.3,47.3 L28.5,46.1 L27.4,44.5 L27.6,37.8 L29.2,37.9 Z M44.0,26.9 L48.2,26.9 L49.5,31.2 L56.6,35.0 L57.4,36.7 L53.8,38.0 L48.2,35.8 L42.8,37.9 L40.0,35.9 L37.3,31.8 L33.0,23.2 L35.0,20.1 L36.6,13.0 L42.5,12.8 L41.5,18.9 L41.8,23.4 Z M142.1,52.2 L139.9,45.3 L140.3,44.2 L133.8,40.9 L118.2,28.1 L105.4,13.4 L98.9,9.9 L88.7,7.4 L86.0,5.5 L85.7,2.8 L89.4,1.2 L101.7,0.0 L107.7,2.4 L109.3,8.3 L111.0,10.7 L134.2,38.1 L144.6,44.5 L172.6,67.2 L171.5,68.2 L170.6,68.8 L170.6,68.8 L170.6,68.8 L170.6,68.8 L158.5,60.5 L149.6,57.2 L145.1,54.1 L142.5,54.0 Z M170.6,68.8 L170.6,68.8 L170.6,68.8 L170.6,68.8 L170.6,68.8 L170.6,68.8 Z M113.0,26.7 L110.6,31.8 L106.8,38.4 L92.2,32.4 L92.6,36.8 L96.9,41.3 L94.4,44.0 L88.5,40.5 L81.8,34.7 L78.0,33.1 L85.4,40.4 L76.8,37.8 L68.3,33.0 L61.5,27.7 L54.1,24.4 L51.9,24.3 L50.1,18.2 L45.3,10.9 L49.2,8.9 L56.2,2.5 L59.3,1.1 L73.2,2.4 L83.1,1.9 L84.5,9.3 L91.7,11.1 L93.4,13.2 L98.9,12.3 L100.9,13.5 Z","M58.5,98.2 L56.1,96.1 L58.2,94.0 L59.9,95.7 Z M170.6,68.8 L169.4,72.6 L165.6,75.6 L165.5,83.7 L161.5,81.5 L155.8,77.1 L153.3,85.3 L150.3,86.9 L135.3,86.8 L132.2,94.6 L127.5,95.0 L117.8,94.2 L104.2,95.8 L99.5,101.8 L100.0,106.7 L95.3,106.2 L88.1,110.6 L80.7,111.1 L81.8,106.7 L81.9,93.8 L74.9,90.8 L73.0,89.0 L71.6,85.0 L70.6,78.4 L76.7,74.3 L86.3,71.5 L90.2,66.4 L96.3,63.8 L92.6,57.9 L86.5,52.8 L73.4,45.0 L70.7,41.7 L76.4,41.9 L81.9,44.1 L92.6,50.3 L102.8,52.9 L109.7,58.3 L110.7,60.3 L108.6,61.4 L108.5,65.0 L112.3,67.6 L121.1,65.4 L137.2,59.1 L141.5,59.5 L151.0,62.1 L162.2,67.2 L170.6,68.8 Z M142.5,54.0 L137.6,55.9 L135.2,54.2 L126.8,53.7 L114.2,42.7 L106.8,38.4 L110.6,31.8 L113.0,26.7 L121.5,35.9 L127.0,39.4 L139.9,45.3 L142.1,52.2 Z","M197.5,160.1 L196.0,162.6 L195.2,165.8 L185.6,168.0 L180.5,171.6 L167.2,172.1 L167.5,176.0 L172.2,177.6 L175.5,181.8 L176.9,186.5 L172.7,189.8 L164.2,200.7 L154.9,208.3 L149.2,208.4 L142.9,204.5 L137.4,207.0 L130.4,216.0 L127.1,223.8 L123.9,225.1 L121.2,230.0 L113.8,227.4 L110.1,219.0 L104.8,216.8 L103.0,211.8 L102.9,206.0 L96.2,197.3 L92.0,194.1 L92.7,189.1 L97.3,188.6 L99.9,182.6 L104.9,179.9 L111.4,180.6 L121.4,179.4 L131.0,175.9 L131.9,169.6 L129.2,162.7 L126.5,158.3 L121.6,156.0 L129.9,150.9 L134.9,146.9 L138.1,142.1 L137.1,132.9 L133.1,130.6 L133.5,128.0 L146.3,127.7 L150.7,130.6 L153.5,134.6 L157.9,132.7 L164.4,128.2 L165.1,126.4 L170.9,126.2 L176.4,128.3 L177.1,134.1 L181.9,134.6 L183.9,138.2 L181.9,143.2 L187.3,140.7 L192.9,141.6 L198.6,145.1 L200.8,147.9 Z","M197.5,160.1 L200.8,147.9 L198.6,145.1 L192.9,141.6 L187.3,140.7 L181.9,143.2 L183.9,138.2 L181.9,134.6 L177.1,134.1 L176.4,128.3 L170.9,126.2 L165.1,126.4 L164.4,128.2 L157.9,132.7 L153.5,134.6 L150.7,130.6 L146.3,127.7 L133.5,128.0 L133.1,130.6 L137.1,132.9 L138.1,142.1 L134.9,146.9 L129.9,150.9 L121.6,156.0 L92.2,157.6 L94.5,151.1 L92.8,148.3 L95.8,140.5 L99.7,139.1 L99.6,131.3 L100.4,125.9 L99.8,123.3 L96.6,118.1 L95.5,112.3 L95.3,106.2 L100.0,106.7 L99.5,101.8 L104.2,95.8 L117.8,94.2 L127.5,95.0 L132.2,94.6 L135.3,86.8 L150.3,86.9 L153.3,85.3 L155.8,77.1 L161.5,81.5 L165.5,83.7 L165.6,75.6 L169.4,72.6 L170.6,68.8 L171.5,68.2 L172.6,67.2 L193.7,84.3 L197.1,89.2 L203.4,95.9 L201.2,97.0 L197.9,94.0 L193.7,93.0 L193.2,95.3 L202.5,103.8 L206.1,105.8 L203.8,101.6 L204.2,100.1 L207.8,100.3 L209.7,105.8 L218.2,122.7 L210.7,120.8 L209.7,123.3 L216.6,126.1 L217.0,130.2 L220.8,127.9 L224.3,137.6 L227.7,142.8 L231.8,145.5 L229.3,148.6 L226.9,145.0 L217.0,141.3 L225.5,150.7 L212.7,155.8 L204.5,156.8 Z"]
  },
  {
    id: "EP",
    name: "Eastern",
    description: "Trincomalee, Arugam Bay, Batticaloa. Golden beaches, pristine coral reefs and some of the best surf spots in Asia.",
    knownFor: ["Arugam Bay Surf","Coral Reefs","Trinco Beach"],
    paths: ["M386.5,418.9 L383.9,421.1 L380.2,417.9 L380.7,404.5 L380.2,400.6 L371.4,388.6 L369.0,381.7 L369.8,376.5 L371.3,376.6 L375.1,384.1 L377.2,389.6 L383.6,399.7 L386.6,415.3 Z M282.5,374.7 L279.9,360.8 L281.5,347.0 L282.8,341.8 L286.8,339.1 L291.9,338.4 L300.1,339.1 L298.6,332.4 L295.6,326.0 L294.3,319.4 L295.7,291.1 L294.7,281.8 L297.7,280.7 L313.7,282.4 L318.0,296.8 L319.4,304.9 L316.2,309.4 L314.1,301.0 L311.4,293.5 L310.1,293.5 L309.8,302.3 L312.2,304.6 L314.0,308.9 L317.1,311.2 L320.1,310.9 L321.2,307.1 L323.7,309.7 L325.2,316.1 L330.0,322.9 L332.2,328.0 L334.7,325.4 L335.8,330.3 L339.5,328.0 L340.4,330.2 L339.5,335.3 L340.8,337.7 L345.7,342.6 L343.3,343.7 L342.2,347.6 L344.3,353.7 L348.0,358.0 L353.1,357.3 L356.2,364.0 L363.9,372.0 L366.4,375.9 L366.8,379.4 L362.9,380.6 L361.0,379.4 L354.3,371.9 L348.9,371.0 L347.1,372.9 L345.8,376.9 L350.0,378.1 L353.1,375.6 L357.2,377.4 L358.0,380.6 L364.6,387.2 L366.6,390.4 L365.4,392.5 L366.6,395.4 L367.0,391.6 L369.1,392.4 L374.3,396.8 L377.6,405.2 L376.4,410.1 L377.6,413.1 L374.9,416.4 L378.9,422.3 L377.1,424.3 L368.8,425.7 L358.9,434.8 L357.6,431.9 L357.1,421.8 L355.6,417.4 L355.6,412.9 L351.4,415.2 L339.5,416.5 L327.7,414.5 L324.7,411.6 L319.0,408.3 L317.0,402.6 L318.8,397.4 L319.0,392.0 L307.9,389.4 L303.9,385.7 L297.8,376.9 L293.1,375.3 L287.3,375.6 Z","M377.1,424.3 L378.7,425.4 L381.3,423.5 L383.9,433.4 L384.5,428.3 L387.1,422.0 L389.3,424.9 L389.7,428.7 L392.5,433.1 L397.0,448.3 L396.2,490.4 L398.5,499.6 L398.8,503.3 L397.8,510.5 L389.6,538.9 L388.4,549.0 L385.8,554.0 L384.3,559.3 L379.2,567.2 L380.4,571.6 L378.4,576.8 L367.1,594.7 L361.1,592.9 L358.1,589.5 L353.8,589.1 L348.4,582.5 L353.0,516.7 L349.9,510.1 L348.7,503.2 L349.8,496.3 L344.5,493.2 L338.1,491.5 L333.3,489.4 L328.9,480.0 L331.0,474.5 L337.6,467.8 L333.7,462.4 L333.2,458.6 L330.7,454.2 L326.7,450.8 L326.3,443.1 L324.1,433.6 L324.5,431.2 L322.1,430.4 L324.8,426.3 L321.3,425.3 L312.7,429.4 L310.8,432.9 L306.5,433.7 L307.7,440.3 L304.8,444.8 L301.2,446.8 L296.8,446.6 L296.8,453.5 L297.7,460.2 L290.8,463.9 L287.8,457.5 L287.2,454.3 L283.6,447.4 L279.8,447.3 L277.1,444.7 L275.2,440.5 L272.7,428.2 L274.2,424.7 L276.1,416.0 L275.4,407.1 L267.5,405.4 L258.7,410.3 L254.9,413.8 L247.7,416.1 L243.3,408.8 L240.4,399.1 L237.2,396.9 L238.9,388.5 L237.3,381.0 L237.4,378.0 L250.7,376.8 L257.2,379.2 L262.5,384.5 L271.1,387.2 L275.3,389.6 L278.8,390.0 L282.2,382.9 L281.7,378.7 L282.5,374.7 L287.3,375.6 L293.1,375.3 L297.8,376.9 L303.9,385.7 L307.9,389.4 L319.0,392.0 L318.8,397.4 L317.0,402.6 L319.0,408.3 L324.7,411.6 L327.7,414.5 L339.5,416.5 L351.4,415.2 L355.6,412.9 L355.6,417.4 L357.1,421.8 L357.6,431.9 L358.9,434.8 L368.8,425.7 Z","M294.7,281.8 L289.7,281.8 L284.3,287.7 L283.2,292.4 L279.8,300.0 L275.3,301.0 L273.7,300.3 L276.7,296.7 L275.9,288.7 L263.4,281.6 L260.2,281.6 L246.7,278.3 L239.1,279.1 L236.9,276.9 L236.2,273.1 L230.5,269.9 L228.4,266.8 L225.8,267.6 L230.8,249.4 L235.5,245.6 L237.0,243.0 L235.8,240.2 L232.1,236.6 L229.6,230.6 L224.9,223.6 L224.1,219.4 L220.7,215.8 L220.6,212.2 L223.3,205.7 L218.7,194.8 L218.6,187.1 L223.7,178.0 L217.8,171.8 L205.5,163.8 L200.3,163.7 L195.2,165.8 L196.0,162.6 L197.5,160.1 L204.5,156.8 L212.7,155.8 L225.5,150.7 L225.5,153.5 L227.7,155.0 L224.1,158.8 L226.9,161.0 L229.9,160.8 L232.4,158.5 L235.4,152.3 L241.8,160.1 L247.6,169.9 L249.9,172.3 L255.8,175.3 L259.6,184.6 L261.6,186.7 L266.0,188.6 L268.2,193.3 L270.7,202.7 L271.8,200.3 L274.5,201.4 L274.0,203.2 L280.6,211.2 L280.6,214.5 L275.7,218.6 L279.4,217.4 L283.3,225.7 L283.8,230.1 L279.4,230.8 L280.3,227.9 L277.1,225.3 L275.7,228.4 L278.2,234.3 L276.9,237.0 L270.8,232.8 L267.6,232.1 L264.7,233.4 L262.4,236.5 L265.9,237.7 L269.7,234.6 L277.3,243.3 L281.2,244.4 L289.4,244.2 L292.2,242.4 L290.4,238.3 L296.9,235.5 L301.1,236.9 L304.5,241.5 L305.8,248.6 L308.6,257.9 L308.8,262.7 L306.5,261.1 L304.2,256.4 L302.1,255.4 L302.9,262.9 L303.9,265.1 L310.6,267.1 L313.7,282.4 L297.7,280.7 Z"]
  },
  {
    id: "NWP",
    name: "North Western",
    description: "Kurunegala, Chilaw, Puttalam. Gateway to ancient kingdoms with historic ruins, coconut plantations and quiet coastal villages.",
    knownFor: ["Ancient Ruins","Coconut Groves","Wilpattu Park"],
    paths: ["M149.8,361.1 L149.5,367.2 L152.4,368.4 L156.7,377.2 L158.3,382.1 L159.8,393.6 L163.0,396.8 L162.5,402.6 L159.3,406.5 L158.9,410.3 L163.1,419.8 L161.7,425.2 L157.4,426.7 L159.9,431.4 L155.4,431.9 L152.8,433.3 L152.8,437.2 L149.8,436.9 L147.0,435.0 L144.4,435.0 L142.9,442.6 L136.0,443.1 L131.8,437.0 L127.5,436.4 L123.5,437.9 L123.1,445.0 L121.2,448.9 L110.6,450.9 L106.4,452.8 L98.7,458.9 L95.1,461.0 L92.0,458.7 L87.5,453.7 L84.4,448.9 L79.4,449.7 L75.0,452.8 L69.8,454.4 L64.9,450.9 L60.6,451.0 L53.8,456.4 L50.0,457.8 L49.6,447.2 L43.0,411.8 L43.1,399.5 L45.0,394.6 L49.6,386.2 L54.4,384.4 L51.2,382.2 L53.3,377.8 L58.2,376.9 L61.4,374.5 L59.8,370.6 L60.3,365.9 L63.0,357.4 L67.5,354.8 L68.9,351.0 L72.7,349.0 L74.8,343.1 L79.6,340.8 L80.7,336.8 L84.4,338.9 L86.6,337.2 L84.5,333.2 L86.9,329.1 L86.9,320.2 L88.1,315.7 L83.5,313.5 L81.8,310.3 L79.3,299.7 L79.1,292.7 L82.9,294.8 L99.4,302.4 L106.3,304.6 L109.0,306.6 L118.2,309.3 L126.5,316.6 L129.7,318.6 L133.1,318.5 L135.8,320.7 L135.5,325.2 L136.1,335.4 L141.5,336.7 L143.0,339.1 L146.0,350.5 L145.3,356.7 Z","M66.7,233.4 L67.7,240.8 L64.4,247.6 L58.8,252.2 L57.8,255.0 L54.8,256.4 L52.8,260.8 L55.4,265.9 L59.8,283.9 L60.9,287.1 L67.6,285.8 L70.8,288.1 L74.4,288.0 L79.1,292.7 L79.3,299.7 L81.8,310.3 L83.5,313.5 L88.1,315.7 L86.9,320.2 L86.9,329.1 L84.5,333.2 L86.6,337.2 L84.4,338.9 L80.7,336.8 L79.6,340.8 L74.8,343.1 L72.7,349.0 L68.9,351.0 L67.5,354.8 L63.0,357.4 L60.3,365.9 L59.8,370.6 L61.4,374.5 L58.2,376.9 L53.3,377.8 L51.2,382.2 L54.4,384.4 L49.6,386.2 L45.0,394.6 L43.1,399.5 L43.0,411.8 L49.6,447.2 L50.0,457.8 L46.8,456.6 L44.2,458.2 L40.7,456.4 L33.9,457.7 L29.7,457.5 L22.1,401.3 L21.0,398.9 L23.5,398.9 L25.2,388.8 L22.8,383.6 L22.4,373.7 L17.8,351.3 L15.7,346.9 L13.9,337.6 L11.0,330.3 L6.6,310.1 L6.6,304.3 L8.5,302.2 L7.5,291.7 L6.6,288.4 L9.6,286.5 L14.4,278.9 L16.0,273.3 L21.3,265.0 L18.6,271.4 L15.2,277.3 L17.4,280.5 L21.3,281.1 L17.7,289.6 L15.4,290.8 L15.1,298.2 L12.1,307.8 L12.4,313.2 L16.4,317.9 L12.8,325.4 L18.5,329.5 L26.8,330.2 L31.0,327.2 L28.4,320.6 L24.4,316.6 L23.8,314.7 L29.9,303.3 L27.5,297.1 L27.5,289.6 L25.9,286.7 L27.1,283.0 L29.5,280.0 L32.0,266.7 L33.8,249.2 L36.9,245.1 L37.3,235.0 L38.4,231.3 L45.3,225.3 L52.1,228.3 L57.4,228.8 Z"]
  },
  {
    id: "NCP",
    name: "North Central",
    description: "Anuradhapura, Polonnaruwa. The ancient heartland of Sri Lanka with UNESCO World Heritage sacred cities and vast reservoirs.",
    knownFor: ["Sacred Cities","UNESCO Sites","Ancient Stupas"],
    paths: ["M282.5,374.7 L281.7,378.7 L282.2,382.9 L278.8,390.0 L275.3,389.6 L271.1,387.2 L262.5,384.5 L257.2,379.2 L250.7,376.8 L237.4,378.0 L228.1,379.7 L218.5,379.0 L217.4,385.4 L213.1,381.5 L209.5,384.8 L205.0,386.6 L200.3,385.6 L198.6,383.1 L198.9,379.6 L196.5,368.7 L197.7,363.8 L202.9,362.6 L205.5,352.8 L207.8,340.2 L213.1,334.6 L205.6,331.9 L202.2,334.8 L199.8,333.2 L199.8,330.1 L195.8,325.8 L196.0,321.0 L199.5,316.2 L195.9,313.3 L196.2,307.1 L197.5,300.1 L200.0,293.3 L201.5,285.8 L204.1,278.9 L211.2,277.6 L219.1,277.6 L221.4,276.3 L223.5,270.0 L225.8,267.6 L228.4,266.8 L230.5,269.9 L236.2,273.1 L236.9,276.9 L239.1,279.1 L246.7,278.3 L260.2,281.6 L263.4,281.6 L275.9,288.7 L276.7,296.7 L273.7,300.3 L275.3,301.0 L279.8,300.0 L283.2,292.4 L284.3,287.7 L289.7,281.8 L294.7,281.8 L295.7,291.1 L294.3,319.4 L295.6,326.0 L298.6,332.4 L300.1,339.1 L291.9,338.4 L286.8,339.1 L282.8,341.8 L281.5,347.0 L279.9,360.8 Z","M225.8,267.6 L223.5,270.0 L221.4,276.3 L219.1,277.6 L211.2,277.6 L204.1,278.9 L201.5,285.8 L200.0,293.3 L197.5,300.1 L196.2,307.1 L195.9,313.3 L199.5,316.2 L196.0,321.0 L195.8,325.8 L188.6,329.0 L181.8,335.4 L178.7,335.0 L177.7,341.2 L173.7,346.2 L174.2,348.3 L167.8,353.8 L162.8,352.3 L159.6,356.1 L153.6,358.3 L149.8,361.1 L145.3,356.7 L146.0,350.5 L143.0,339.1 L141.5,336.7 L136.1,335.4 L135.5,325.2 L135.8,320.7 L133.1,318.5 L129.7,318.6 L126.5,316.6 L118.2,309.3 L109.0,306.6 L106.3,304.6 L99.4,302.4 L82.9,294.8 L79.1,292.7 L74.4,288.0 L70.8,288.1 L67.6,285.8 L60.9,287.1 L59.8,283.9 L55.4,265.9 L52.8,260.8 L54.8,256.4 L57.8,255.0 L58.8,252.2 L64.4,247.6 L67.7,240.8 L66.7,233.4 L69.9,234.3 L70.3,217.7 L68.9,207.2 L76.8,210.4 L85.6,210.5 L102.9,206.0 L103.0,211.8 L104.8,216.8 L110.1,219.0 L113.8,227.4 L121.2,230.0 L123.9,225.1 L127.1,223.8 L130.4,216.0 L137.4,207.0 L142.9,204.5 L149.2,208.4 L154.9,208.3 L164.2,200.7 L172.7,189.8 L176.9,186.5 L175.5,181.8 L172.2,177.6 L167.5,176.0 L167.2,172.1 L180.5,171.6 L185.6,168.0 L195.2,165.8 L200.3,163.7 L205.5,163.8 L217.8,171.8 L223.7,178.0 L218.6,187.1 L218.7,194.8 L223.3,205.7 L220.6,212.2 L220.7,215.8 L224.1,219.4 L224.9,223.6 L229.6,230.6 L232.1,236.6 L235.8,240.2 L237.0,243.0 L235.5,245.6 L230.8,249.4 Z"]
  },
  {
    id: "Uva",
    name: "Uva",
    description: "Badulla, Bandarawela, Haputale. Misty mountains, dramatic waterfalls and some of the finest tea estates in the world.",
    knownFor: ["Waterfalls","Tea Estates","Hiking Trails"],
    paths: ["M226.6,563.1 L223.3,563.3 L219.6,566.0 L215.3,567.7 L211.2,567.0 L206.6,561.8 L207.4,559.4 L212.3,557.2 L214.0,553.5 L210.9,552.5 L208.4,549.9 L205.8,551.0 L205.3,544.4 L208.7,543.6 L210.5,541.0 L207.2,539.1 L209.9,534.9 L206.1,527.3 L200.3,524.5 L200.1,521.6 L206.7,521.6 L209.1,518.9 L210.0,515.3 L216.1,511.2 L222.8,509.7 L226.8,503.9 L229.3,497.2 L232.5,493.1 L231.2,488.7 L233.3,485.5 L231.9,483.6 L230.5,476.0 L230.7,472.8 L236.8,470.3 L241.6,465.9 L241.9,460.0 L238.0,447.1 L236.4,420.0 L235.5,405.4 L237.2,396.9 L240.4,399.1 L243.3,408.8 L247.7,416.1 L254.9,413.8 L258.7,410.3 L267.5,405.4 L275.4,407.1 L276.1,416.0 L274.2,424.7 L272.7,428.2 L275.2,440.5 L277.1,444.7 L279.8,447.3 L283.6,447.4 L287.2,454.3 L287.8,457.5 L280.8,459.2 L280.9,462.9 L279.5,466.2 L273.0,475.2 L270.0,476.4 L267.5,473.7 L264.5,473.4 L262.4,476.6 L261.9,480.2 L266.9,485.7 L270.8,491.6 L277.4,489.9 L281.6,494.8 L283.0,503.0 L281.5,511.2 L279.4,515.0 L278.0,520.4 L273.9,520.1 L267.9,526.7 L259.5,530.1 L263.9,536.2 L258.7,537.7 L257.1,540.7 L251.1,541.3 L251.0,548.9 L249.5,552.1 L250.2,554.5 L253.3,555.3 L253.5,558.5 L250.9,562.6 L250.6,567.9 L252.2,572.9 L254.9,577.1 L251.2,578.4 L250.6,582.7 L246.8,580.5 L244.2,584.4 L243.5,589.2 L239.9,584.2 L239.1,578.4 L236.6,577.1 L233.7,569.5 L230.9,568.5 L228.7,563.2 Z","M348.4,582.5 L345.2,586.2 L340.4,587.1 L333.4,593.1 L329.1,595.0 L325.6,597.9 L326.6,603.3 L325.0,605.7 L325.1,608.7 L322.8,612.5 L317.8,611.4 L309.0,613.8 L298.4,617.9 L290.4,620.4 L283.7,624.9 L279.2,623.0 L273.1,614.0 L269.3,615.4 L265.6,615.3 L264.2,612.0 L261.1,610.9 L252.2,610.4 L250.5,612.3 L248.3,610.8 L246.8,615.2 L242.1,615.4 L241.3,619.4 L243.0,623.5 L239.1,626.4 L234.0,628.0 L225.1,633.3 L222.0,625.9 L215.3,621.8 L210.7,614.6 L210.6,603.5 L208.9,597.7 L215.0,587.9 L216.8,580.1 L218.5,576.1 L221.8,572.2 L223.6,567.6 L226.6,563.1 L228.7,563.2 L230.9,568.5 L233.7,569.5 L236.6,577.1 L239.1,578.4 L239.9,584.2 L243.5,589.2 L244.2,584.4 L246.8,580.5 L250.6,582.7 L251.2,578.4 L254.9,577.1 L252.2,572.9 L250.6,567.9 L250.9,562.6 L253.5,558.5 L253.3,555.3 L250.2,554.5 L249.5,552.1 L251.0,548.9 L251.1,541.3 L257.1,540.7 L258.7,537.7 L263.9,536.2 L259.5,530.1 L267.9,526.7 L273.9,520.1 L278.0,520.4 L279.4,515.0 L281.5,511.2 L283.0,503.0 L281.6,494.8 L277.4,489.9 L270.8,491.6 L266.9,485.7 L261.9,480.2 L262.4,476.6 L264.5,473.4 L267.5,473.7 L270.0,476.4 L273.0,475.2 L279.5,466.2 L280.9,462.9 L280.8,459.2 L287.8,457.5 L290.8,463.9 L297.7,460.2 L296.8,453.5 L296.8,446.6 L301.2,446.8 L304.8,444.8 L307.7,440.3 L306.5,433.7 L310.8,432.9 L312.7,429.4 L321.3,425.3 L324.8,426.3 L322.1,430.4 L324.5,431.2 L324.1,433.6 L326.3,443.1 L326.7,450.8 L330.7,454.2 L333.2,458.6 L333.7,462.4 L337.6,467.8 L331.0,474.5 L328.9,480.0 L333.3,489.4 L338.1,491.5 L344.5,493.2 L349.8,496.3 L348.7,503.2 L349.9,510.1 L353.0,516.7 Z"]
  },
  {
    id: "Sab",
    name: "Sabaragamuwa",
    description: "Ratnapura, Sinharaja. The gem capital of Sri Lanka surrounded by the legendary Sinharaja rainforest and precious gemstone mines.",
    knownFor: ["Gem Mining","Sinharaja Forest","Waterfalls"],
    paths: ["M149.2,537.3 L150.3,541.6 L148.2,544.7 L151.9,547.5 L156.3,547.8 L165.6,549.9 L175.4,551.2 L183.6,550.3 L189.6,550.5 L195.2,549.7 L205.3,544.4 L205.8,551.0 L208.4,549.9 L210.9,552.5 L214.0,553.5 L212.3,557.2 L207.4,559.4 L206.6,561.8 L211.2,567.0 L215.3,567.7 L219.6,566.0 L223.3,563.3 L226.6,563.1 L223.6,567.6 L221.8,572.2 L218.5,576.1 L216.8,580.1 L215.0,587.9 L208.9,597.7 L210.6,603.5 L210.7,614.6 L215.3,621.8 L222.0,625.9 L225.1,633.3 L228.4,637.0 L230.1,641.6 L229.2,644.7 L218.8,642.2 L214.0,637.6 L207.2,638.7 L203.7,638.2 L190.6,633.5 L180.3,631.5 L181.3,628.8 L179.0,627.1 L177.1,623.0 L169.6,623.1 L170.8,620.0 L168.2,615.2 L157.3,616.3 L156.0,619.2 L149.0,620.5 L147.5,618.3 L144.6,618.3 L139.0,615.6 L133.3,614.3 L128.7,610.0 L122.2,598.8 L114.6,588.2 L113.7,585.2 L116.4,584.1 L113.8,579.2 L109.8,575.6 L105.3,572.7 L104.3,567.5 L98.8,562.2 L95.9,555.3 L96.2,552.4 L93.1,544.2 L92.5,540.5 L96.5,537.0 L92.1,532.3 L93.7,527.7 L98.0,521.9 L100.8,520.6 L113.1,533.1 L116.2,532.0 L118.4,535.3 L122.9,536.3 L128.3,533.2 L133.3,533.1 L142.0,536.9 Z","M136.0,443.1 L138.2,448.6 L145.9,455.4 L145.6,458.8 L151.7,462.4 L153.9,465.0 L153.5,470.8 L158.1,476.0 L155.7,480.6 L151.8,481.1 L149.0,484.2 L142.8,485.2 L140.7,487.0 L144.8,495.7 L143.4,502.1 L142.6,505.3 L137.8,509.3 L139.9,511.8 L138.7,518.5 L140.2,523.7 L145.4,525.3 L149.6,528.4 L151.2,535.5 L149.2,537.3 L142.0,536.9 L133.3,533.1 L128.3,533.2 L122.9,536.3 L118.4,535.3 L116.2,532.0 L113.1,533.1 L100.8,520.6 L98.0,521.9 L97.7,518.4 L100.0,516.2 L99.5,512.9 L96.4,511.3 L92.5,511.1 L93.0,508.0 L90.4,499.5 L91.3,494.2 L93.6,489.0 L96.2,487.2 L97.5,484.2 L93.8,483.1 L89.4,484.1 L87.2,479.6 L88.0,474.6 L93.1,470.9 L93.6,464.8 L95.1,461.0 L98.7,458.9 L106.4,452.8 L110.6,450.9 L121.2,448.9 L123.1,445.0 L123.5,437.9 L127.5,436.4 L131.8,437.0 Z"]
  }
];

const FadeInSection = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(provincesData[1]); // Central default
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Ensure video autoplays
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Interactive Map", path: "/map" },
    { name: "Experiences", path: "/experiences" },
    { name: "About", path: "/about" }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-inter text-[#33353D] overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-sm py-4`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 cursor-pointer flex items-center">
            <img 
              src="/tripin_logo.png" 
              alt="Trippin Logo" 
              className="h-16 w-auto object-contain mix-blend-multiply transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-sm font-medium tracking-wide relative group text-[#33353D]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#F05442] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none text-[#33353D]"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <div 
          className={`lg:hidden absolute top-full left-0 w-full bg-[#2A2B31] transition-all duration-300 origin-top overflow-hidden ${
            mobileMenuOpen ? 'max-h-[300px] py-4' : 'max-h-0 py-0'
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#FFFFFF] text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* SECTION 1 - HERO */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            src="/main_vid.mp4" 
          />
          {/* Enhanced Overlay for Professional Look */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <FadeInSection>
            <h1 className="font-playfair font-bold text-5xl md:text-7xl lg:text-[100px] text-white mb-6 drop-shadow-2xl leading-[1.1] tracking-tight">
              Explore the Wonder <br className="hidden md:block" /> of Asia
            </h1>
            <p className="font-inter text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-lg font-light">
              Discover pristine beaches, ancient cultures, and breathtaking wildlife in Sri Lanka.
            </p>
            <div className="flex flex-col items-center gap-20">
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black px-12 py-4 rounded-full font-medium transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>

              {/* Scroll Down Arrow */}
              <div 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              >
                <ChevronDown size={40} className="text-white" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 2 - ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              {/* Left Column: Content & Stats */}
              <div className="w-full lg:w-1/2 space-y-10">
                <div className="space-y-6">
                  <p className="font-inter text-[#10B981] font-bold tracking-[0.2em] text-sm uppercase">
                    About Sri Lanka
                  </p>
                  <h2 className="font-playfair font-bold text-4xl md:text-6xl text-[#1A1C1E] leading-tight">
                    A Pearl in the <br /> Indian Ocean
                  </h2>
                  <div className="space-y-6">
                    <p className="font-inter text-[#4A4D55] text-lg leading-relaxed font-light">
                      Sri Lanka is an island nation celebrated for its immense natural beauty, rich history, and warm hospitality. From the misty tea-covered hills of the central highlands to the sun-kissed beaches encircling the island, there is an adventure waiting for every traveler.
                    </p>
                    <p className="font-inter text-[#4A4D55] text-lg leading-relaxed font-light">
                      Experience a vibrant culture shaped by over 2,500 years of history, encounter incredible wildlife, and savor a unique culinary heritage that will tantalize your taste buds.
                    </p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
                    <p className="font-playfair font-bold text-3xl text-[#10B981]">8</p>
                    <p className="font-inter text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">UNESCO Sites</p>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
                    <p className="font-playfair font-bold text-3xl text-[#10B981]">1330km</p>
                    <p className="font-inter text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">Coastline</p>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
                    <p className="font-playfair font-bold text-3xl text-[#10B981]">22+</p>
                    <p className="font-inter text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">National Parks</p>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Hero Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-[#10B981]/10 rounded-[2rem] blur-xl group-hover:bg-[#10B981]/20 transition-all duration-500"></div>
                  <img 
                    src="/sigiriya.jpg" 
                    alt="Sigiriya Rock Fortress" 
                    className="relative rounded-3xl w-full h-[400px] sm:h-[600px] object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {/* Decorative element */}
                  <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/50">
                    <p className="font-playfair italic text-[#1A1C1E] text-lg">"The Eighth Wonder of the World"</p>
                    <p className="font-inter text-xs text-[#64748B] mt-1 font-semibold uppercase tracking-widest">— Sigiriya, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 3 - INTERACTIVE RED MAP */}
      <section id="explore" className="py-24 bg-[#FAFAFA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16 space-y-4 px-4">
              <h2 className="font-playfair font-bold text-3xl md:text-5xl text-[#1A1C1E]">
                The Province Explorer
              </h2>
              <div className="h-1.5 w-24 bg-[#F05442] mx-auto rounded-full"></div>
              <p className="font-inter text-[#64748B] text-lg max-w-2xl mx-auto font-light">
                Click on the provinces below to discover the unique heritage and hidden gems of every corner of the island.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
              {/* Left: SVG Map (God Tier Styling) */}
              <div className="w-full lg:w-1/2 flex justify-center relative">
                <div className="absolute inset-0 bg-[#F05442]/5 blur-[100px] rounded-full"></div>
                <svg viewBox="0 0 500 750" className="w-full max-w-md h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10">
                  {provincesData.map((prov) => {
                    const isSelected = selectedProvince.id === prov.id;
                    return (
                      <g 
                        key={prov.id} 
                        className="cursor-pointer transition-all duration-500" 
                        onClick={() => setSelectedProvince(prov)}
                      >
                        {prov.paths && prov.paths.map((pPath, idx) => (
                          <path 
                            key={idx}
                            d={pPath}
                            fill={isSelected ? "#F05442" : "#FFFFFF"}
                            stroke={isSelected ? "#F05442" : "#E2E8F0"}
                            strokeWidth={isSelected ? "2" : "1.5"}
                            className="transition-all duration-500 ease-in-out hover:fill-[#F05442]/80 hover:stroke-[#F05442]"
                            style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(240, 84, 66, 0.4))' : 'none' }}
                          />
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Right: Info Card (God Tier Card Design) */}
              <div className="w-full lg:w-1/2 px-4">
                <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-6 sm:p-10 border border-[#E2E8F0] relative overflow-hidden group">
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F05442]/5 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-110"></div>
                  
                  <p className="font-inter text-[#F05442] tracking-widest text-xs font-bold uppercase mb-4">
                    Province Spotlight
                  </p>
                  <h3 className="font-playfair font-bold text-2xl sm:text-4xl text-[#1A1C1E] mb-6">
                    {selectedProvince.name} <span className="text-[#F05442]">Province</span>
                  </h3>
                  <p className="font-inter text-[#4A4D55] mb-10 leading-relaxed text-lg font-light">
                    {selectedProvince.description}
                  </p>
                  
                  <div className="mb-10">
                    <p className="font-inter text-sm font-bold text-[#1A1C1E] mb-4 uppercase tracking-widest">Key Highlights</p>
                    <div className="flex flex-wrap gap-3">
                      {selectedProvince.knownFor.map((item, i) => (
                        <span key={i} className="bg-[#F8FAFC] text-[#4A4D55] px-5 py-2.5 rounded-xl text-sm font-medium border border-[#E2E8F0] hover:border-[#F05442] hover:text-[#F05442] transition-colors duration-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="bg-[#1A1C1E] text-white hover:bg-[#F05442] px-10 py-4 rounded-full font-medium transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-[#F05442]/30 transform hover:-translate-y-1">
                    Explore Deeply &rarr;
                  </button>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 4 - BIODIVERSITY (New Design) */}
      <section id="biodiversity" className="py-24 bg-[#1A3C34] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="mb-16 space-y-4">
              <p className="font-inter text-[#62D3B4] font-bold tracking-[0.2em] text-sm uppercase">
                Wild Beauty
              </p>
              <h2 className="font-playfair font-bold text-3xl md:text-6xl text-white leading-tight">
                Biodiversity of Sri Lanka
              </h2>
              <p className="font-inter text-white/80 text-lg max-w-3xl leading-relaxed font-light">
                Despite its small size, Sri Lanka boasts one of the highest rates of biological endemism in the world. It is recognized as a global biodiversity hotspot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Majestic Elephants */}
              <div className="bg-[#244A41] rounded-[2rem] overflow-hidden border border-white/10 group hover:shadow-2xl hover:shadow-black/20 transition-all duration-500">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/elepents.jpg" 
                    alt="Sri Lankan Elephants" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="font-playfair font-bold text-2xl text-white">Majestic Elephants</h3>
                  <p className="font-inter text-white/70 text-sm leading-relaxed">
                    Home to the Asian elephant. Minneriya National Park hosts the 'Gathering', where hundreds of elephants congregate.
                  </p>
                </div>
              </div>

              {/* Card 2: Sigiriya Sanctuary */}
              <div className="bg-[#244A41] rounded-[2rem] overflow-hidden border border-white/10 group hover:shadow-2xl hover:shadow-black/20 transition-all duration-500">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/sigiriya_drone_view.jpg" 
                    alt="Sigiriya Drone View" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="font-playfair font-bold text-2xl text-white">Ancient Sigiriya</h3>
                  <p className="font-inter text-white/70 text-sm leading-relaxed">
                    A UNESCO World Heritage site surrounded by lush jungles, showcasing the perfect harmony between ancient architecture and nature.
                  </p>
                </div>
              </div>

              {/* Card 3: Marine Life */}
              <div className="bg-[#244A41] rounded-[2rem] overflow-hidden border border-white/10 group hover:shadow-2xl hover:shadow-black/20 transition-all duration-500">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=2070&auto=format&fit=crop" 
                    alt="Marine Life Sri Lanka" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="font-playfair font-bold text-2xl text-white">Marine Life</h3>
                  <p className="font-inter text-white/70 text-sm leading-relaxed">
                    The waters around Sri Lanka are home to blue whales, sperm whales, dolphins, and endangered sea turtles.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 5 - CULTURE (New Design) */}
      <section id="culture" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              {/* Left Column: Image Mosaic */}
              <div className="w-full lg:w-3/5 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img 
                      src="/tempal.jpg" 
                      alt="Ancient Temple" 
                      className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img 
                      src="/sigiriya_d_view_2.jpg" 
                      alt="Sigiriya View" 
                      className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <img 
                    src="/dancer.jpg" 
                    alt="Traditional Dancer" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Right Column: Cultural Content */}
              <div className="w-full lg:w-2/5 space-y-8">
                <div className="space-y-4">
                  <p className="font-inter text-[#F05442] font-bold tracking-[0.2em] text-sm uppercase">
                    Rich Heritage
                  </p>
                  <h2 className="font-playfair font-bold text-3xl md:text-6xl text-[#1A1C1E] leading-tight">
                    A Tapestry of Culture
                  </h2>
                </div>

                <p className="font-inter text-[#4A4D55] text-lg leading-relaxed font-light">
                  Sri Lanka's culture is a vibrant blend of traditions, influenced by Buddhism, Hinduism, and colonial history. From colorful festivals and traditional Kandyan dancing to the spicy aromas of its unique cuisine, the island offers a deeply immersive cultural experience.
                </p>

                <ul className="space-y-4">
                  {[
                    "Ancient Ruined Cities of Anuradhapura and Polonnaruwa",
                    "The Sacred Temple of the Tooth Relic in Kandy",
                    "Rock Fortress of Sigiriya",
                    "Vibrant Festivals like Esala Perahera"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="mt-2 w-2 h-2 rounded-full bg-[#F05442] group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="font-inter text-[#1A1C1E] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 6 - THINGS TO DO (Enhanced Design) */}
      <section id="thingstodo" className="py-24 bg-[#FAFAFA] relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <h2 className="text-[15vw] font-playfair font-bold text-black/[0.03] whitespace-nowrap">
            EXPLORE SRI LANKA
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-20 space-y-4">
              <p className="font-inter text-[#F05442] font-bold tracking-[0.3em] text-sm uppercase">
                Experiences
              </p>
              <h2 className="font-playfair font-bold text-3xl md:text-6xl text-[#1A1C1E]">
                Things to Do
              </h2>
              <div className="h-1 w-20 bg-[#F05442] mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Card 1: Surfing & Beaches */}
              <div className="space-y-6 group cursor-pointer">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop" 
                    alt="Surfing in Sri Lanka" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-3 px-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#F05442] uppercase">Adventure</span>
                  <h3 className="font-playfair font-bold text-2xl text-[#1A1C1E] group-hover:text-[#F05442] transition-colors">Surfing & Beaches</h3>
                  <p className="font-inter text-[#64748B] text-[15px] leading-relaxed">
                    Catch world-class waves in Arugam Bay or relax on the golden shores of Mirissa and Unawatuna.
                  </p>
                  <div className="pt-2 flex items-center text-sm font-bold text-[#1A1C1E] group-hover:gap-2 transition-all">
                    <span>Discover More</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-all">&rarr;</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Tea Country Trails */}
              <div className="space-y-6 group cursor-pointer">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] bg-white">
                  <img 
                    src="/tea_trails.png" 
                    alt="Tea Estates Sri Lanka" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-3 px-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#F05442] uppercase">Nature</span>
                  <h3 className="font-playfair font-bold text-2xl text-[#1A1C1E] group-hover:text-[#F05442] transition-colors">Tea Country Trails</h3>
                  <p className="font-inter text-[#64748B] text-[15px] leading-relaxed">
                    Hike through lush emerald tea estates in Nuwara Eliya and enjoy the famous Ceylon tea.
                  </p>
                  <div className="pt-2 flex items-center text-sm font-bold text-[#1A1C1E] group-hover:gap-2 transition-all">
                    <span>Explore Trails</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-all">&rarr;</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Historical Exploration */}
              <div className="space-y-6 group cursor-pointer relative">
                {/* Decorative Coordinate */}
                <div className="absolute -top-4 -right-4 text-[10px] font-mono text-black/20 rotate-90 select-none">
                  6.0333° N, 80.2167° E
                </div>
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] bg-white">
                  <img 
                    src="/gallefort.jpg" 
                    alt="Galle Fort Sri Lanka" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-3 px-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#F05442] uppercase">Heritage</span>
                  <h3 className="font-playfair font-bold text-2xl text-[#1A1C1E] group-hover:text-[#F05442] transition-colors">Historical Exploration</h3>
                  <p className="font-inter text-[#64748B] text-[15px] leading-relaxed">
                    Wander through the cobbled streets of Galle Fort or scale the ancient steps of Sigiriya.
                  </p>
                  <div className="pt-2 flex items-center text-sm font-bold text-[#1A1C1E] group-hover:gap-2 transition-all">
                    <span>Visit Forts</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-all">&rarr;</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center">
              <button className="px-10 py-4 border-2 border-[#1A1C1E] text-[#1A1C1E] rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#1A1C1E] hover:text-white transition-all duration-300">
                View All Experiences
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 7 - CALL TO ACTION */}
      <section className="py-24 bg-[#1A1C1E] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2078&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Background Pattern"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeInSection>
            <h2 className="font-playfair font-bold text-3xl md:text-6xl mb-8 px-4">Ready to start your adventure?</h2>
            <p className="font-inter text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light">
              Join thousands of travelers who have discovered the magic of the Pearl of the Indian Ocean. Your story starts here.
            </p>
            <button className="bg-[#F05442] text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#F05442] transition-all duration-500 shadow-xl shadow-black/20">
              Plan Your Trip Now
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 8 - FINAL FOOTER (Design-Led & Social-Integrated) */}
      <footer className="bg-[#111111] pt-24 pb-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 mb-20">
            {/* Social Section */}
            <div className="space-y-4">
              <p className="font-inter text-[#4D6345] font-bold tracking-[0.2em] text-xs uppercase">Social</p>
                <div className="flex gap-8">
                  <a href="#" className="text-white hover:text-[#4D6345] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#4D6345] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 flex-grow w-full border-b border-white/20 pb-4 focus-within:border-[#4D6345] transition-colors">
                <h3 className="font-playfair text-2xl md:text-5xl text-white">Join Our Mailing List</h3>
                <div className="flex-grow w-full">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-transparent border-none outline-none font-inter text-lg placeholder:text-white/30 py-2"
                  />
                </div>
                <button className="bg-[#3D4F37] hover:bg-[#2D3F27] text-white px-10 py-4 font-bold text-xs tracking-[0.2em] transition-all uppercase whitespace-nowrap">
                  Sign Up
                </button>
              </div>
            </div>
            <p className="font-inter text-white/40 text-sm font-light">
              Get 10% off your first purchase when you sign up for our newsletter!
            </p>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="font-inter text-white/40 text-sm hover:text-white transition-colors tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <img 
                src="/tripin_logo.png" 
                alt="Trippin Logo" 
                className="h-10 w-auto grayscale invert mix-blend-screen opacity-50"
              />
              <p className="font-inter text-white/20 text-[10px] tracking-[0.3em] uppercase">
                &copy; 2026 TRIPPIN LK. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
